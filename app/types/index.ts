// Pipeline Types
export interface PipelineNode {
  id: string;
  type: 'build' | 'test' | 'deploy' | 'monitor' | 'custom';
  position: { x: number; y: number };
  data: {
    label: string;
    status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
    duration?: number;
    logs?: string[];
    error?: string;
  };
}

export interface PipelineEdge {
  id: string;
  source: string;
  target: string;
  type?: 'success' | 'failure' | 'conditional';
  animated?: boolean;
}

export interface Pipeline {
  id: string;
  name: string;
  description: string;
  applicationType: 'web' | 'mobile' | 'ml';
  nodes: PipelineNode[];
  edges: PipelineEdge[];
  status: 'idle' | 'running' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

// Application Types
export interface ApplicationType {
  id: 'web' | 'mobile' | 'ml';
  name: string;
  description: string;
  icon: string;
  defaultPipeline: Omit<Pipeline, 'id' | 'createdAt' | 'updatedAt'>;
}

// Simulation Types
export interface SimulationState {
  isRunning: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  logs: LogEntry[];
  errors: string[];
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
  nodeId?: string;
}

// Store Types
export interface AppState {
  currentPipeline: Pipeline | null;
  simulationState: SimulationState;
  applicationTypes: ApplicationType[];
  selectedApplicationType: ApplicationType['id'] | null;
  isSimulationMode: boolean;
}

export interface AppActions {
  setCurrentPipeline: (pipeline: Pipeline | null) => void;
  setSimulationState: (state: Partial<SimulationState>) => void;
  setSelectedApplicationType: (type: ApplicationType['id'] | null) => void;
  setApplicationTypes: (types: ApplicationType[]) => void;
  setIsSimulationMode: (mode: boolean) => void;
  addLog: (log: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
  resetSimulation: () => void;
}
