'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, Square, RotateCcw, Settings } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '../store/useAppStore';
import { applicationTypes } from '../lib/applicationTypes';
import { PipelineVisualization } from '../components/PipelineVisualization';
import { PipelineStats } from '../components/PipelineStats';
import { useSimulation } from '../hooks/useSimulation';
import { v4 as uuidv4 } from 'uuid';
import { stepReferences } from '../lib/stepReferences';
import { pipelineStages } from '../lib/pipelineStages';

export default function Simulator() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') as 'web' | 'mobile' | 'ml' | null;
  
  const {
    currentPipeline,
    simulationState,
    selectedApplicationType,
    setCurrentPipeline,
    setSelectedApplicationType,
    setIsSimulationMode,
  } = useAppStore();

  const {
    startSimulation,
    pauseSimulation,
    resumeSimulation,
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

  // Create a stage map from pipelineStages
  const stageMap = Object.fromEntries(pipelineStages.map(s => [s.id, s]));

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
  }, [type, isInitialized, setSelectedApplicationType, setCurrentPipeline, setIsInitialized]);

  const handleStartSimulation = () => {
    if (!currentPipeline) return;
    setIsSimulationMode(true);
    startSimulation();
  };

  const handlePauseSimulation = () => pauseSimulation();
  const handleResumeSimulation = () => resumeSimulation();
  const handleStopSimulation = () => stopSimulation();
  const handleResetSimulation = () => resetSimulation();
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
            {!isRunning ? (
              <button
                onClick={handleStartSimulation}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Play className="w-4 h-4" />
                Start
              </button>
            ) : (
              <button
                onClick={handlePauseSimulation}
                className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <Pause className="w-4 h-4" />
                Pause
              </button>
            )}

            <button
              onClick={handleStopSimulation}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Square className="w-4 h-4" />
              Stop
            </button>

            <button
              onClick={handleResetSimulation}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Failure Rate
                </label>
                <input type="range" min="0" max="50" defaultValue="10" className="w-full" />
                <p className="text-xs text-gray-500 mt-1">10% chance of failure</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auto-advance
                </label>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Automatically advance steps</span>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pipeline Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Visualization</h2>

              <PipelineVisualization pipeline={currentPipeline} className="h-96" />
            </div>
          </div>

          {/* Simulation Info & Logs */}
          <div className="space-y-6">
            {/* Pipeline Statistics */}
            <PipelineStats pipeline={currentPipeline} />

            {/* Simulation Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Simulation Status</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`font-semibold ${isRunning ? 'text-green-600' : 'text-gray-600'}`}
                  >
                    {isRunning ? 'Running' : 'Stopped'}
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
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Logs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Simulation Logs</h2>

              {simulationState.logs.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No logs yet. Start the simulation to see logs.
                </p>
              ) : (
                simulationState.logs.map((log) => {
                  const match = log.message.match(/^\[(.+?)\]\s*(.+)$/);
                  let learnMoreUrl: string | undefined;

                  if (match) {
                    const stage = match[1].trim();
                    const step = match[2].trim();

                    // First try stepReferences lookup
                    learnMoreUrl = stepReferences[stage]?.[step];

                    // Fallback: case-insensitive step match
                    if (!learnMoreUrl && stepReferences[stage]) {
                      const key = Object.keys(stepReferences[stage]).find(
                        (k) => k.toLowerCase() === step.toLowerCase()
                      );
                      if (key) learnMoreUrl = stepReferences[stage][key];
                    }
                  }

                  // Additional check: nodeId with pipelineStages
                  if (log.nodeId && stageMap[log.nodeId]?.learnMoreUrl) {
                    learnMoreUrl = stageMap[log.nodeId].learnMoreUrl;
                  }

                  return (
                    <div
                      key={log.id}
                      className={`text-sm p-2 rounded ${
                        log.level === 'error'
                          ? 'bg-red-50 text-red-700'
                          : log.level === 'warning'
                          ? 'bg-yellow-50 text-yellow-700'
                          : log.level === 'success'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="text-xs text-gray-500">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                      <span className="ml-2">{log.message}</span>
                      {learnMoreUrl && (
                        <a
                          href={learnMoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-600 underline"
                        >
                          Learn more
                        </a>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
