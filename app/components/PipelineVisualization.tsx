'use client';

import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeTypes,
  EdgeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { PipelineNode } from './PipelineNode';
import { PipelineEdge } from './PipelineEdge';
import { Pipeline, PipelineNode as PipelineNodeType, PipelineEdge as PipelineEdgeType } from '../types';

const nodeTypes: NodeTypes = {
  pipelineNode: PipelineNode,
};

const edgeTypes: EdgeTypes = {
  pipelineEdge: PipelineEdge,
};

interface PipelineVisualizationProps {
  pipeline: Pipeline | null;
  onNodeClick?: (nodeId: string) => void;
  className?: string;
}

export function PipelineVisualization({ 
  pipeline, 
  onNodeClick,
  className = '' 
}: PipelineVisualizationProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Convert pipeline data to React Flow format
  const flowNodes: Node[] = useMemo(() => {
    if (!pipeline) return [];
    
    return pipeline.nodes.map((node) => ({
      id: node.id,
      type: 'pipelineNode',
      position: node.position,
      data: node.data,
      draggable: false,
      selectable: true,
    }));
  }, [pipeline]);

  const flowEdges: Edge[] = useMemo(() => {
    if (!pipeline) return [];
    
    return pipeline.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: 'pipelineEdge',
      animated: edge.animated,
      data: {
        status: edge.type,
        label: edge.type === 'success' ? '✓' : edge.type === 'failure' ? '✗' : '',
      },
    }));
  }, [pipeline]);

  // Update nodes and edges when pipeline changes
  useMemo(() => {
    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [flowNodes, flowEdges, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClickHandler = useCallback(
    (event: React.MouseEvent, node: Node) => {
      onNodeClick?.(node.id);
    },
    [onNodeClick]
  );

  if (!pipeline) {
    return (
      <div className={`flex items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 ${className}`}>
        <div className="text-center">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2 1M4 7l2-1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No Pipeline Selected</p>
          <p className="text-gray-400 text-sm">Select an application type to view the pipeline</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-96 ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClickHandler}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{
          padding: 0.2,
          includeHiddenNodes: false,
        }}
        minZoom={0.1}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        className="bg-gray-50"
      >
        {/* <Background color="#e5e7eb" gap={20} /> */}
        <Controls />
        {/* <MiniMap
          nodeColor={(node) => {
            const status = node.data?.status;
            switch (status) {
              case 'success': return '#10b981';
              case 'failed': return '#ef4444';
              case 'running': return '#3b82f6';
              default: return '#6b7280';
            }
          }}
          nodeStrokeWidth={3}
          zoomable
          pannable
        /> */}
      </ReactFlow>
    </div>
  );
}
