import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { AppState, AppActions, SimulationState, LogEntry, Pipeline } from '../types';

const initialSimulationState: SimulationState = {
  isRunning: false,
  currentStep: 0,
  totalSteps: 0,
  speed: 1,
  logs: [],
  errors: [],
};

const initialState: AppState = {
  currentPipeline: null,
  simulationState: initialSimulationState,
  applicationTypes: [],
  selectedApplicationType: null,
  isSimulationMode: false,
};

export const useAppStore = create<AppState & AppActions>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setCurrentPipeline: (pipeline: Pipeline | null) => {
        set({ currentPipeline: pipeline }, false, 'setCurrentPipeline');
      },

      setSimulationState: (state: Partial<SimulationState>) => {
        set(
          (prev) => ({
            simulationState: { ...prev.simulationState, ...state },
          }),
          false,
          'setSimulationState'
        );
      },

      setSelectedApplicationType: (type: ApplicationType['id'] | null) => {
        set({ selectedApplicationType: type }, false, 'setSelectedApplicationType');
      },

      setApplicationTypes: (types: ApplicationType[]) => {
        set({ applicationTypes: types }, false, 'setApplicationTypes');
      },

      setIsSimulationMode: (mode: boolean) => {
        set({ isSimulationMode: mode }, false, 'setIsSimulationMode');
      },

      addLog: (log: Omit<LogEntry, 'id' | 'timestamp'>) => {
        const newLog: LogEntry = {
          ...log,
          id: uuidv4(),
          timestamp: new Date(),
        };

        set(
          (prev) => ({
            simulationState: {
              ...prev.simulationState,
              logs: [...prev.simulationState.logs, newLog],
            },
          }),
          false,
          'addLog'
        );
      },

      clearLogs: () => {
        set(
          (prev) => ({
            simulationState: {
              ...prev.simulationState,
              logs: [],
              errors: [],
            },
          }),
          false,
          'clearLogs'
        );
      },

      resetSimulation: () => {
        set(
          {
            simulationState: initialSimulationState,
            isSimulationMode: false,
          },
          false,
          'resetSimulation'
        );
      },
    }),
    {
      name: 'devops-simulator-store',
    }
  )
);
