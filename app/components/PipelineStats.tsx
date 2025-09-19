'use client';

import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, Play } from 'lucide-react';
import { Pipeline } from '../types';

interface PipelineStatsProps {
  pipeline: Pipeline | null;
  className?: string;
}

export function PipelineStats({ pipeline, className = '' }: PipelineStatsProps) {
  if (!pipeline) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Statistics</h3>
        <p className="text-gray-500 text-sm">No pipeline data available</p>
      </div>
    );
  }

  const stats = {
    total: pipeline.nodes.length,
    completed: pipeline.nodes.filter(node => node.data.status === 'success').length,
    failed: pipeline.nodes.filter(node => node.data.status === 'failed').length,
    running: pipeline.nodes.filter(node => node.data.status === 'running').length,
    pending: pipeline.nodes.filter(node => node.data.status === 'pending').length,
  };

  const totalDuration = pipeline.nodes.reduce((sum, node) => {
    return sum + (node.data.duration || 0);
  }, 0);

  const statItems = [
    {
      label: 'Total Steps',
      value: stats.total,
      icon: Play,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Failed',
      value: stats.failed,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      label: 'Duration',
      value: totalDuration > 0 ? `${(totalDuration / 1000).toFixed(1)}s` : '0s',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Statistics</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {statItems.map((item, index) => {
          const IconComponent = item.icon;
          
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className={`w-8 h-8 rounded-full ${item.bgColor} flex items-center justify-center`}>
                <IconComponent className={`w-4 h-4 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className={`text-lg font-semibold ${item.color}`}>
                  {item.value}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Overall Progress</span>
          <span>{Math.round((stats.completed / stats.total) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(stats.completed / stats.total) * 100}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      </div>
    </div>
  );
}
