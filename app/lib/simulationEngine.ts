import { Pipeline, PipelineNode, LogEntry } from '../types';
import { getRandomDelay } from './utils';
import { pipelineStageData } from './pipelineStages';

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

  // Simulation controls
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.isPaused = false;
    this.currentStep = 0;
    this.log('info', 'Pipeline simulation started');
    this.executeNextStep();
  }

  pause() {
    if (!this.isRunning || this.isPaused) return;
    this.isPaused = true;
    this.log('warning', 'Pipeline simulation paused');
    this.stepTimeouts.forEach(timeout => clearTimeout(timeout));
    this.stepTimeouts = [];
  }

  resume() {
    if (!this.isRunning || !this.isPaused) return;
    this.isPaused = false;
    this.log('info', 'Pipeline simulation resumed');
    this.executeNextStep();
  }

  stop() {
    if (!this.isRunning) return;
    this.isRunning = false;
    this.isPaused = false;
    this.stepTimeouts.forEach(timeout => clearTimeout(timeout));
    this.stepTimeouts = [];
    this.log('info', 'Pipeline simulation stopped');
    this.currentStep = 0;
  }

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
        },
      })),
    };
    this.log('info', 'Pipeline simulation reset');
  }

  private async executeNextStep() {
    if (!this.isRunning || this.isPaused) return;
    if (this.currentStep >= this.pipeline.nodes.length) {
      this.completeSimulation();
      return;
    }
    const currentNode = this.pipeline.nodes[this.currentStep];
    await this.startNodeExecution(currentNode);
  }

  private async startNodeExecution(node: PipelineNode) {
    this.updateNodeStatus(node.id, 'running');

    const currentStageData = pipelineStageData[node.id];
    if (currentStageData) {
        for (const subStep of currentStageData.subSteps) {
            if (!this.isRunning || this.isPaused) return;
            this.log('info', `[${node.id}] ${subStep.description}`, node.id, subStep.learnMoreUrl);
            await new Promise(res => setTimeout(res, 400));
        }
    }
    
    if (!this.isRunning || this.isPaused) return;

    this.log('info', `Starting ${node.data.label}`, node.id);

    const duration = getRandomDelay(1000, 3000);
    const timeout = setTimeout(() => {
      if (this.isPaused || !this.isRunning) return;
      // The random failure logic has been removed.
      this.completeNodeExecution(node, duration);
    }, duration);
    this.stepTimeouts.push(timeout);
  }

  private completeNodeExecution(node: PipelineNode, duration: number) {
    this.updateNodeStatus(node.id, 'success', duration);
    const stageData = pipelineStageData[node.id];

    this.log(
      'success',
      `${node.data.label} completed successfully`,
      node.id,
      undefined, // No 'learnMoreUrl' for this log
      stageData?.showResultUrl // The 'showResultUrl' for the completion log
    );

    this.onStepComplete?.({
      nodeId: node.id,
      action: 'complete',
      timestamp: new Date(),
      duration,
    });
    
    setTimeout(() => {
      if (!this.isRunning || this.isPaused) return;
      this.currentStep++;
      this.executeNextStep();
    }, 100);
  }

  private failNodeExecution(node: PipelineNode, duration: number) {
    const errorMessages = [ 'Build failed: Compilation error', 'Tests failed: 3 assertions failed', 'Deployment failed: Connection timeout' ];
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
    this.isRunning = false; 
    this.log('error', 'Pipeline execution failed.');
  }

  private updateNodeStatus(
    nodeId: string, 
    status: PipelineNode['data']['status'], 
    duration?: number,
    error?: string
  ) {
    const nodeIndex = this.pipeline.nodes.findIndex(node => node.id === nodeId);
    if (nodeIndex !== -1) {
      this.pipeline.nodes[nodeIndex].data = {
        ...this.pipeline.nodes[nodeIndex].data,
        status,
        duration,
        error,
      };
    }
  }

  private completeSimulation() {
    this.isRunning = false;
    this.pipeline.status = 'completed';
    this.log('success', 'Pipeline simulation completed successfully');
    this.onComplete?.();
  }

  private log(level: LogEntry['level'], message: string, nodeId?: string, learnMoreUrl?: string, showResultUrl?: string) {
    this.onLog?.({ level, message, nodeId, learnMoreUrl, showResultUrl });
  }

  getPipeline(): Pipeline {
    return { ...this.pipeline };
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      isPaused: this.isPaused,
      currentStep: this.currentStep,
      totalSteps: this.pipeline.nodes.length,
      progress: this.pipeline.nodes.length > 0 ? (this.currentStep / this.pipeline.nodes.length) * 100 : 0,
    };
  }

  destroy() {
    this.stop();
  }
}
