'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';
import { SimulationEngine, SimulationStep } from '../lib/simulationEngine';
import { Pipeline } from '../types';

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

  // Initialize simulation engine when pipeline changes
  useEffect(() => {
    if (currentPipeline && !simulationRef.current) {
      simulationRef.current = new SimulationEngine(currentPipeline);
      
      // Set up event handlers
      simulationRef.current.onStepCompleteHandler((step: SimulationStep) => {
        // Update pipeline with new node status
        if (currentPipeline) {
          const updatedPipeline = simulationRef.current?.getPipeline();
          if (updatedPipeline) {
            setCurrentPipeline(updatedPipeline);
          }
        }
      });

      simulationRef.current.onLogHandler((log) => {
        addLog(log);
      });

      simulationRef.current.onCompleteHandler(() => {
        setSimulationState({ isRunning: false });
      });
    }

    return () => {
      if (simulationRef.current) {
        simulationRef.current.destroy();
        simulationRef.current = null;
      }
    };
  }, [currentPipeline, setCurrentPipeline, setSimulationState, addLog]);

  // Start simulation
  const startSimulation = useCallback(() => {
    if (simulationRef.current && !simulationState.isRunning) {
      clearLogs();
      setSimulationState({ 
        isRunning: true, 
        currentStep: 0,
        totalSteps: currentPipeline?.nodes.length || 0,
      });
      simulationRef.current.start();
    }
  }, [simulationState.isRunning, currentPipeline, setSimulationState, clearLogs]);

  // Pause simulation
  const pauseSimulation = useCallback(() => {
    if (simulationRef.current && simulationState.isRunning) {
      simulationRef.current.pause();
      setSimulationState({ isRunning: false });
    }
  }, [simulationState.isRunning, setSimulationState]);

  // Resume simulation
  const resumeSimulation = useCallback(() => {
    if (simulationRef.current && !simulationState.isRunning) {
      simulationRef.current.resume();
      setSimulationState({ isRunning: true });
    }
  }, [simulationState.isRunning, setSimulationState]);

  // Stop simulation
  const stopSimulation = useCallback(() => {
    if (simulationRef.current) {
      simulationRef.current.stop();
      setSimulationState({ isRunning: false, currentStep: 0 });
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
      });
      clearLogs();
    }
  }, [setCurrentPipeline, setSimulationState, clearLogs]);

  // Get simulation status
  const getSimulationStatus = useCallback(() => {
    return simulationRef.current?.getStatus() || {
      isRunning: false,
      isPaused: false,
      currentStep: 0,
      totalSteps: 0,
      progress: 0,
    };
  }, []);

  // Update simulation speed
  const updateSpeed = useCallback((speed: number) => {
    setSimulationState({ speed });
  }, [setSimulationState]);

  return {
    startSimulation,
    pauseSimulation,
    resumeSimulation,
    stopSimulation,
    resetSimulation,
    updateSpeed,
    getSimulationStatus,
    isRunning: simulationState.isRunning,
    currentStep: simulationState.currentStep,
    totalSteps: simulationState.totalSteps,
    progress: (simulationState.currentStep / simulationState.totalSteps) * 100,
  };
}
