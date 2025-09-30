'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, Square, RotateCcw, AlertTriangle, X, File, TestTube2, FileImage, Server } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '../store/useAppStore';
import { applicationTypes } from '../lib/applicationTypes';
import { PipelineVisualization } from '../components/PipelineVisualization';
import { PipelineStats } from '../components/PipelineStats';
import { useSimulation } from '../hooks/useSimulation';
import { v4 as uuidv4 } from 'uuid';
import { pipelineStageData } from '../lib/pipelineStages';
import { PipelineNode, PipelineArtifact } from '../types';

// Stage Details Modal component yahan rahega (tumhara jo tha wahi)

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
    isRunning,
    currentStep,
    totalSteps,
    progress,
    failSimulation,
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

  const handleFailureRecovery = () => {
    failSimulation();
  };

  const handleNodeClick = (node?: PipelineNode) => {
    if (node && node.data && node.data.status === 'success') {
      setViewingStageId(node.id);
    }
  };


  if (!type || !currentPipeline) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Pipeline Selected</h1>
          <Link href="/application-selection" className="text-blue-600 hover:text-blue-700 transition-colors">
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
        {viewingStageId && <StageDetailsModal stageId={viewingStageId} onClose={() => setViewingStageId(null)} />}
      </AnimatePresence>

      {/* Header */}
      <header className="w-full px-8 py-4 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/application-selection" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{appType?.name} Pipeline</h1>
              <p className="text-sm text-gray-600">{currentPipeline.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleStartOrPause}
              className={`flex items-center gap-2 text-white px-4 py-2 rounded-lg transition-colors ${isRunning ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Pause' : 'Start'}
            </button>

            <button onClick={stopSimulation} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              <Square className="w-4 h-4" />
              Stop
            </button>

            <button onClick={resetSimulation} className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>

            <button onClick={handleFailureRecovery} className="px-6 py-2 rounded font-semibold bg-amber-500 text-white border-2 border-amber-600 shadow hover:bg-amber-600 transition flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Failure & Recovery
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-10 py-8" style={{ height: 'calc(100vh - 80px)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10" style={{ height: '100%' }}>
          <div className="lg:col-span-2 flex flex-col gap-6" style={{ height: '100%' }}>
            {/* Pipeline Statistics on top */}


            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Pipeline Visualization</h2>
              <div className="flex-grow">
                <PipelineVisualization
                  pipeline={currentPipeline}
                  className="h-full"
                  onNodeClick={handleNodeClick}
                />
              </div>
            </div>


            <div className="grid grid-cols-2 gap-6">
              <div>
                {/* Pipeline Statistics */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <PipelineStats pipeline={currentPipeline} />
                </div>


              </div>
              <div>
                {/* Simulation Status */}
                {/* Simulation Status below PipelineStats */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Simulation Status</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-semibold ${isRunning ? 'text-green-600' : 'text-gray-600'}`}>
                        {isRunning ? 'Running' : 'Paused'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Progress:</span>
                      <span className="font-semibold text-gray-900">{currentStep} / {totalSteps}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress || 0}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

           
            
    

         
          </div>

          {/* Right Column: Simulation Logs */}
          <div className="space-y-6 h-[calc(100vh-135px)] max-h-screen overflow-y-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-[calc(100vh-135px)] max-h-screen overflow-y-auto">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Simulation Logs</h2>
              <div className="space-y-1">
                {simulationState.logs.length === 0 ? (
                  <p className="text-gray-500 text-sm">No logs yet. Start the simulation to see logs.</p>
                ) : (
                  simulationState.logs.map((log) => (
                    <div key={log.id} className={`text-sm p-2 rounded flex justify-between items-center ${log.level === 'error' ? 'bg-red-50 text-red-700'
                        : log.level === 'warning' ? 'bg-yellow-50 text-yellow-700'
                          : log.level === 'success' ? 'bg-green-50 text-green-700'
                            : 'bg-gray-50 text-gray-700'
                      }`}>
                      <div>
                        <span className="text-xs text-gray-500 mr-2">{log.timestamp.toLocaleTimeString()}</span>
                        <span>{log.message}</span>
                      </div>

                      {log.learnMoreUrl && (
                        <a href={log.learnMoreUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold text-xs flex-shrink-0 ml-4">
                          Learn more
                        </a>
                      )}

                      {log.showResultUrl && (
                        <a href={log.showResultUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 underline font-semibold text-xs flex-shrink-0 ml-4">
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
