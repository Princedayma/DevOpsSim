import { Pipeline, PipelineNode, LogEntry } from '../types';
import { getRandomDelay, formatTimestamp } from './utils';
import { pipelineStages } from './pipelineStages';

// Add stageSubSteps here
const stageSubSteps: Record<string, string[]> = {
  source: [
    'Fetch code from repository',
    'Checkout branch',
    'Verify commit hash'
  ],
  preprocessing: [
    'Validate configuration files',
    'Check environment variables',
    'Prepare workspace'
  ],
  build: [
    'Install dependencies',
    'Compile source code',
    'Run linter',
    'Generate build artifacts'
  ],
  test: [
    'Run unit tests',
    'Run integration tests',
    'Generate test reports'
  ],
  deploy: [
    'Provision infrastructure',
    'Upload artifacts',
    'Run deployment scripts',
    'Verify deployment'
  ],
  // Add more stages and sub-steps as needed
};

// ...rest of your code (SimulationEngine class)...

export interface SimulationStep {
  nodeId: string;
  action: 'start' | 'complete' | 'fail';
  timestamp: Date;
  duration?: number;
  error?: string;
}

export class SimulationEngine {
  private pipeline: Pipeline;
  private currentStep: number = 0;
  private isRunning: boolean = false;
  private isPaused: boolean = false;
  private stepTimeouts: NodeJS.Timeout[] = [];
  private onStepComplete?: (step: SimulationStep) => void;
  private onLog?: (log: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  private onComplete?: () => void;

  constructor(pipeline: Pipeline) {
    this.pipeline = { ...pipeline };
  }

  // Event handlers
  onStepCompleteHandler(callback: (step: SimulationStep) => void) {
    this.onStepComplete = callback;
  }

  onLogHandler(callback: (log: Omit<LogEntry, 'id' | 'timestamp'>) => void) {
    this.onLog = callback;
  }

  onCompleteHandler(callback: () => void) {
    this.onComplete = callback;
  }

  // Start the simulation
  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.isPaused = false;
    this.currentStep = 0;

    this.log('info', 'Pipeline simulation started');
    this.executeNextStep();
  }

  // Pause the simulation
  pause() {
    if (!this.isRunning || this.isPaused) return;

    this.isPaused = true;
    this.log('warning', 'Pipeline simulation paused');

    this.stepTimeouts.forEach(timeout => clearTimeout(timeout));
    this.stepTimeouts = [];
  }

  // Resume the simulation
  resume() {
    if (!this.isRunning || !this.isPaused) return;

    this.isPaused = false;
    this.log('info', 'Pipeline simulation resumed');
    this.executeNextStep();
  }

  // Stop the simulation
  stop() {
    this.isRunning = false;
    this.isPaused = false;
    this.currentStep = 0;

    this.stepTimeouts.forEach(timeout => clearTimeout(timeout));
    this.stepTimeouts = [];

    this.log('info', 'Pipeline simulation stopped');
  }

  // Reset the simulation
  reset() {
    this.stop();
    this.pipeline = {
      ...this.pipeline,
      status: 'idle',
      nodes: this.pipeline.nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          status: 'pending',
          duration: undefined,
          error: undefined,
        }
      }))
    };
    this.log('info', 'Pipeline simulation reset');
  }

  // Execute the next step in the pipeline
  private async executeNextStep() {
    if (!this.isRunning || this.isPaused || this.currentStep >= this.pipeline.nodes.length) {
      if (this.currentStep >= this.pipeline.nodes.length) {
        this.completeSimulation();
      }
      return;
    }

    const currentNode = this.pipeline.nodes[this.currentStep];
    await this.startNodeExecution(currentNode);
  }

  // Start executing a specific node
  private async startNodeExecution(node: PipelineNode) {
    this.updateNodeStatus(node.id, 'running');

    // Log each sub-step for this stage
    const subSteps = stageSubSteps[node.id] || [];
    for (const subStep of subSteps) {
      this.log('info', `[${node.id}] ${subStep}`, node.id);
      await new Promise(res => setTimeout(res, 400)); // Simulate delay
    }

    this.log('info', `Starting ${node.id}`, node.id);

    // Simulate execution time
    const duration = getRandomDelay(1000, 3000);

    const timeout = setTimeout(() => {
      if (this.isPaused) return;
      this.completeNodeExecution(node, duration);
    }, duration);

    this.stepTimeouts.push(timeout);
  }

  // Complete node execution successfully
  private completeNodeExecution(node: PipelineNode, duration: number) {
    this.updateNodeStatus(node.id, 'success', duration);

    this.log('success', `${node.data.label} completed successfully`, node.id);

    this.onStepComplete?.({
      nodeId: node.id,
      action: 'complete',
      timestamp: new Date(),
      duration,
    });

    this.currentStep++;
    this.executeNextStep();
  }

  // Fail node execution
  private failNodeExecution(node: PipelineNode, duration: number) {
    const errorMessages = [
      'Build failed due to compilation errors',
      'Tests failed - 3 out of 15 tests are failing',
      'Deployment failed - insufficient permissions',
      'Connection timeout to deployment server',
      'Resource quota exceeded',
      'Configuration validation failed',
    ];

    const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];

    this.updateNodeStatus(node.id, 'failed', duration, randomError);

    this.log('error', `${node.data.label} failed: ${randomError}`, node.id);

    this.onStepComplete?.({
      nodeId: node.id,
      action: 'fail',
      timestamp: new Date(),
      duration,
      error: randomError,
    });

    this.stop();
  }

  // Update node status
  private updateNodeStatus(
    nodeId: string, 
    status: PipelineNode['data']['status'], 
    duration?: number,
    error?: string
  ) {
    const nodeIndex = this.pipeline.nodes.findIndex(node => node.id === nodeId);
    if (nodeIndex !== -1) {
      this.pipeline.nodes[nodeIndex] = {
        ...this.pipeline.nodes[nodeIndex],
        data: {
          ...this.pipeline.nodes[nodeIndex].data,
          status,
          duration,
          error,
        }
      };
    }
  }

  // Run pipeline using pipelineStages
  async runPipeline() {
    for (const stage of pipelineStages) {
      this.log('info', `Stage started: ${stage.label} - ${stage.description}`, stage.id);
      // Simulate work (replace with real logic)
      await this.simulateStage(stage.id);
      this.log('success', `Stage completed: ${stage.label}`, stage.id);
    }
  }

  // Simulate individual stage execution
  private async simulateStage(stageId: string) {
    const subSteps = stageSubSteps[stageId] || [];
    for (const subStep of subSteps) {
      this.log('info', `[${stageId}] ${subStep}`, stageId);
      await new Promise(res => setTimeout(res, 400));
    }

    // Simulate random stage duration
    await new Promise(res => setTimeout(res, getRandomDelay(1000, 3000)));
  }

  // Complete the entire simulation
  private completeSimulation() {
    this.isRunning = false;
    this.pipeline.status = 'completed';

    this.log('success', 'Pipeline simulation completed successfully');
    this.onComplete?.();
  }

  // Add a log entry
  private log(level: LogEntry['level'], message: string, nodeId?: string) {
    this.onLog?.({
      level,
      message,
      nodeId,
    });
  }

  // Get current pipeline state
  getPipeline(): Pipeline {
    return { ...this.pipeline };
  }

  // Get simulation status
  getStatus() {
    return {
      isRunning: this.isRunning,
      isPaused: this.isPaused,
      currentStep: this.currentStep,
      totalSteps: this.pipeline.nodes.length,
      progress: (this.currentStep / this.pipeline.nodes.length) * 100,
    };
  }

  // Cleanup
  destroy() {
    this.stop();
    this.stepTimeouts.forEach(timeout => clearTimeout(timeout));
    this.stepTimeouts = [];
  }
}
