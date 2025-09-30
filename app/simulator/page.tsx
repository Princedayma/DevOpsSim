'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, Square, RotateCcw, Settings, X, File, TestTube2, FileImage, Server } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '../store/useAppStore';
import { applicationTypes } from '../lib/applicationTypes';
import { PipelineVisualization } from '../components/PipelineVisualization';
import { PipelineStats } from '../components/PipelineStats';
import { useSimulation } from '../hooks/useSimulation';
import { v4 as uuidv4 } from 'uuid';
import { pipelineStageData } from '../lib/pipelineStages';
import { PipelineNode, PipelineArtifact } from '../types';

// --- NEW COMPONENT: Stage Details Modal ---
const StageDetailsModal = ({ stageId, onClose }: { stageId: string, onClose: () => void }) => {
  const stageData = pipelineStageData[stageId];
  if (!stageData) return null;

  const getIconForArtifact = (type: PipelineArtifact['type']) => {
    switch (type) {
      case 'report': return <TestTube2 className="w-5 h-5 text-purple-500" />;
      case 'binary': return <Server className="w-5 h-5 text-gray-500" />;
      case 'image': return <FileImage className="w-5 h-5 text-blue-500" />;
      default: return <File className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{stageData.label} - Results</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto">
          {/* Real Logs Section */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-gray-700 mb-2">Execution Logs</h3>
            <div className="bg-gray-900 text-white font-mono text-sm rounded-lg p-4 h-96 overflow-y-auto">
              {stageData.realLogs.map((log, index) => (
                <p key={index} className="whitespace-pre-wrap">{`$ ${log}`}</p>
              ))}
            </div>
          </div>

          {/* Artifacts Section */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Generated Artifacts</h3>
            <div className="space-y-2">
              {stageData.artifacts.length > 0 ? (
                stageData.artifacts.map((artifact, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                      {getIconForArtifact(artifact.type)}
                      <span className="text-gray-800">{artifact.name}</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">{artifact.size}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No artifacts were generated.</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


export default function Simulator() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') as 'web' | 'mobile' | 'ml' | null;
  
  const {
    currentPipeline,
    simulationState,
    setCurrentPipeline,
    setSelectedApplicationType,
    setIsSimulationMode,
  } = useAppStore();

  const {
    startSimulation,
    pauseSimulation,
    stopSimulation,
    resetSimulation,
    updateSpeed,
    isRunning,
    currentStep,
    totalSteps,
    progress,
  } = useSimulation();

  const [isInitialized, setIsInitialized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [viewingStageId, setViewingStageId] = useState<string | null>(null);


  useEffect(() => {
    if (type && !isInitialized) {
      const appType = applicationTypes.find(app => app.id === type);
      if (appType) {
        setSelectedApplicationType(type);
        const pipeline = {
          ...appType.defaultPipeline,
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setCurrentPipeline(pipeline);
        setIsInitialized(true);
      }
    }
  }, [type, isInitialized, setSelectedApplicationType, setCurrentPipeline]);

  const handleStartOrPause = () => {
    if (isRunning) {
      pauseSimulation();
    } else {
      setIsSimulationMode(true);
      startSimulation();
    }
  };
  
  // --- THIS IS THE FIX ---
  // Added a defensive check to ensure 'node' and 'node.data' exist before access.
  const handleNodeClick = (node?: PipelineNode) => {
    if (node && node.data && node.data.status === 'success') {
      setViewingStageId(node.id);
    }
  };

  const handleSpeedChange = (speed: number) => updateSpeed(speed);

  if (!type || !currentPipeline) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Pipeline Selected</h1>
          <Link
            href="/application-selection"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            ← Go back to select an application type
          </Link>
        </div>
      </div>
    );
  }

  const appType = applicationTypes.find(app => app.id === type);

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence>
        {viewingStageId && (
          <StageDetailsModal
            stageId={viewingStageId}
            onClose={() => setViewingStageId(null)}
          />
        )}
      </AnimatePresence>
      
      {/* Header */}
      <header className="w-full px-8 py-4 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/application-selection"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {appType?.name} Pipeline
              </h1>
              <p className="text-sm text-gray-600">{currentPipeline.description}</p>
            </div>
          </div>

          {/* Simulation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleStartOrPause}
              className={`flex items-center gap-2 text-white px-4 py-2 rounded-lg transition-colors ${
                isRunning 
                ? 'bg-yellow-600 hover:bg-yellow-700' 
                : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Pause' : 'Start'}
            </button>

            <button
              onClick={stopSimulation}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Square className="w-4 h-4" />
              Stop
            </button>

            <button
              onClick={resetSimulation}
              className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Settings Panel */}
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Simulation Settings</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Simulation Speed
                </label>
                <select
                  value={simulationState.speed}
                  onChange={(e) => handleSpeedChange(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={0.5}>0.5x (Slow)</option>
                  <option value={1}>1x (Normal)</option>
                  <option value={2}>2x (Fast)</option>
                  <option value={4}>4x (Very Fast)</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pipeline Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Visualization</h2>
              <PipelineVisualization 
                pipeline={currentPipeline} 
                className="h-96"
                onNodeClick={handleNodeClick} 
              />
            </div>
          </div>

          {/* Simulation Info & Logs */}
          <div className="space-y-6">
            <PipelineStats pipeline={currentPipeline} />

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Simulation Status</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`font-semibold ${isRunning ? 'text-green-600' : 'text-gray-600'}`}
                  >
                    {isRunning ? 'Running' : 'Paused'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Progress:</span>
                  <span className="font-semibold text-gray-900">
                    {currentStep} / {totalSteps}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress || 0}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Logs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Simulation Logs</h2>
              <div className="space-y-1 h-96 overflow-y-auto pr-2">
                {simulationState.logs.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    No logs yet. Start the simulation to see logs.
                  </p>
                ) : (
                  simulationState.logs.map((log) => (
                    <div
                      key={log.id}
                      className={`text-sm p-2 rounded flex justify-between items-center ${
                        log.level === 'error' ? 'bg-red-50 text-red-700'
                        : log.level === 'warning' ? 'bg-yellow-50 text-yellow-700'
                        : log.level === 'success' ? 'bg-green-50 text-green-700'
                        : 'bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div>
                        <span className="text-xs text-gray-500 mr-2">
                          {log.timestamp.toLocaleTimeString()}
                        </span>
                        <span>{log.message}</span>
                      </div>
                      {log.learnMoreUrl && (
                        <a
                          href={log.learnMoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline font-semibold text-xs flex-shrink-0 ml-4"
                        >
                          Learn more
                        </a>
                      )}
                      {log.showResultUrl && (
                        <a
                          href={log.showResultUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 underline font-semibold text-xs flex-shrink-0 ml-4"
                        >
                          Show result
                        </a>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
