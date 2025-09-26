'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';
import { SimulationEngine, SimulationStep } from '../lib/simulationEngine';

export function useSimulation() {
  const simulationRef = useRef<SimulationEngine | null>(null);
  const {
    currentPipeline,
    simulationState,
    setCurrentPipeline,
    setSimulationState,
    addLog,
    clearLogs,
  } = useAppStore();

  // Initialize simulation engine when pipeline ID changes
  useEffect(() => {
    if (currentPipeline) {
      // If the engine exists, destroy it before creating a new one
      if (simulationRef.current) {
        simulationRef.current.destroy();
      }
      
      const engine = new SimulationEngine(currentPipeline);
      simulationRef.current = engine;
      
      // Set up event handlers
      engine.onStepCompleteHandler((step: SimulationStep) => {
        if (simulationRef.current) {
          // Update the pipeline visualization with the new node status
          const updatedPipeline = simulationRef.current.getPipeline();
          setCurrentPipeline(updatedPipeline);

          // --- THIS IS THE FIX ---
          // Get the latest status from the engine and update the UI state
          const status = simulationRef.current.getStatus();
          setSimulationState({
            currentStep: status.currentStep,
            progress: status.progress,
          });
        }
      });

      engine.onLogHandler((log) => {
        addLog(log);
      });

      engine.onCompleteHandler(() => {
        if (simulationRef.current) {
            const status = simulationRef.current.getStatus();
            setSimulationState({ 
                isRunning: false,
                currentStep: status.currentStep, // Ensure final step is shown
                progress: 100, // Ensure progress bar is full
            });
        }
      });
    }

    // Cleanup function to destroy the engine when the component unmounts
    return () => {
      if (simulationRef.current) {
        simulationRef.current.destroy();
        simulationRef.current = null;
      }
    };
  }, [currentPipeline?.id, setCurrentPipeline, setSimulationState, addLog]); // Depend only on the pipeline's unique ID

  // Start simulation
  const startSimulation = useCallback(() => {
    if (simulationRef.current && !simulationState.isRunning) {
      clearLogs();
      // Reset state before starting
      simulationRef.current.reset();
      const resetPipeline = simulationRef.current.getPipeline();
      setCurrentPipeline(resetPipeline);
      
      setSimulationState({ 
        isRunning: true, 
        currentStep: 0,
        totalSteps: currentPipeline?.nodes.length || 0,
        progress: 0,
      });
      simulationRef.current.start();
    }
  }, [simulationState.isRunning, currentPipeline, setSimulationState, clearLogs, setCurrentPipeline]);

  // Pause simulation
  const pauseSimulation = useCallback(() => {
    if (simulationRef.current && simulationState.isRunning) {
      simulationRef.current.pause();
      setSimulationState({ isRunning: false });
    }
  }, [simulationState.isRunning, setSimulationState]);

  // Stop simulation
  const stopSimulation = useCallback(() => {
    if (simulationRef.current) {
      simulationRef.current.stop();
      setSimulationState({ isRunning: false, currentStep: 0, progress: 0 });
    }
  }, [setSimulationState]);

  // Reset simulation
  const resetSimulation = useCallback(() => {
    if (simulationRef.current) {
      simulationRef.current.reset();
      const resetPipeline = simulationRef.current.getPipeline();
      setCurrentPipeline(resetPipeline);
      setSimulationState({ 
        isRunning: false, 
        currentStep: 0,
        totalSteps: resetPipeline.nodes.length,
        progress: 0,
      });
      clearLogs();
    }
  }, [setCurrentPipeline, setSimulationState, clearLogs]);

  return {
    startSimulation,
    pauseSimulation,
    stopSimulation,
    resetSimulation,
    isRunning: simulationState.isRunning,
    progress: simulationState.progress,
    // Directly use state for display
    currentStep: simulationState.currentStep,
    totalSteps: simulationState.totalSteps,
  };
}
