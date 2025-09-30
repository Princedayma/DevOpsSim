'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { 
  Play, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  Code,
  TestTube,
  Rocket,
  Monitor,
  Settings
} from 'lucide-react';
import { PipelineNode as PipelineNodeType } from '../types';

const nodeIcons = {
  build: Code,
  test: TestTube,
  deploy: Rocket,
  monitor: Monitor,
  custom: Settings,
};

const statusColors = {
  pending: 'bg-gray-100 border-gray-300 text-gray-700',
  running: 'bg-blue-100 border-blue-400 text-blue-800',
  success: 'bg-green-100 border-green-400 text-green-800',
  failed: 'bg-red-100 border-red-400 text-red-800',
  skipped: 'bg-yellow-100 border-yellow-400 text-yellow-800',
};

const statusIcons = {
  pending: Clock,
  running: Play,
  success: CheckCircle,
  failed: XCircle,
  skipped: AlertCircle,
};

export interface PipelineNode {
  id: string;
  label: string;
  type: string;
  duration?: number;
  error?: string;
  // Aur jitni bhi properties hain
  status?: 'pending' | 'running' | 'success' | 'failed' | 'skipped'; // Yeh line add karo
}


export const PipelineNode = memo(({ data, selected }: NodeProps<PipelineNodeType['data']>) => {
  const IconComponent = nodeIcons[data.type] || Settings;
  const StatusIcon = statusIcons[data.status];
  const statusColorClass = statusColors[data.status];

  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`min-w-[200px] p-4 rounded-lg border-2 shadow-lg transition-all duration-300 ${
        statusColors[data.status]
      } ${selected ? 'ring-2 ring-blue-500' : ''}`}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />
      
      {/* Node Content */}
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            data.status === 'running' ? 'animate-pulse' : ''
          }`}>
            <IconComponent className="w-5 h-5" />
          </div>
        </div>
        
        <div className="flex-grow min-w-0">
          <h3 className="font-semibold text-sm truncate">
            {data.label}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <StatusIcon className="w-3 h-3" />
            <span className="text-xs capitalize">
              {data.status}
            </span>
          </div>
          {data.duration && (
            <p className="text-xs text-gray-500 mt-1">
              {data.duration}ms
            </p>
          )}
        </div>
      </div>
      
      {/* Error Message */}
      {data.error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700"
        >
          {data.error}
        </motion.div>
      )}
      
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />
    </motion.div>
  );
});

PipelineNode.displayName = 'PipelineNode';
