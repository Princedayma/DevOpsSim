'use client';

import { memo } from 'react';
import { EdgeProps, getBezierPath } from '@xyflow/react';
import { motion } from 'framer-motion';

export const PipelineEdge = memo(({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  animated = false,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const edgeColor = data?.status === 'success' 
    ? '#10b981' 
    : data?.status === 'failed' 
    ? '#ef4444' 
    : '#6b7280';

  return (
    <>
      <motion.path
        id={id}
        style={{
          ...style,
          stroke: edgeColor,
          strokeWidth: 2,
        }}
        className="react-flow__edge-path"
        d={edgePath}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      
      {animated && (
        <motion.circle
          r="3"
          fill={edgeColor}
          className="react-flow__edge-path"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{
            offsetPath: `path("${edgePath}")`,
          }}
        />
      )}
      
      {/* Edge Label */}
      {data?.label && (
        <motion.text
          x={labelX}
          y={labelY}
          className="react-flow__edge-text"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: '12px',
            fill: edgeColor,
            fontWeight: '500',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {data.label}
        </motion.text>
      )}
    </>
  );
});

PipelineEdge.displayName = 'PipelineEdge';
