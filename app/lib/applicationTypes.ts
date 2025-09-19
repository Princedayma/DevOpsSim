import { ApplicationType } from '../types';

export const applicationTypes: ApplicationType[] = [
  {
    id: 'web',
    name: 'Web Application',
    description: 'Build, test, and deploy modern web applications with CI/CD pipelines',
    icon: 'Globe',
    defaultPipeline: {
      name: 'Web App Pipeline',
      description: 'Standard CI/CD pipeline for web applications',
      applicationType: 'web',
      status: 'idle',
      nodes: [
        {
          id: 'source',
          type: 'custom',
          position: { x: 100, y: 100 },
          data: {
            label: 'Source Code',
            status: 'pending',
          },
        },
        {
          id: 'build',
          type: 'build',
          position: { x: 300, y: 100 },
          data: {
            label: 'Build',
            status: 'pending',
          },
        },
        {
          id: 'test',
          type: 'test',
          position: { x: 500, y: 100 },
          data: {
            label: 'Test',
            status: 'pending',
          },
        },
        {
          id: 'deploy',
          type: 'deploy',
          position: { x: 700, y: 100 },
          data: {
            label: 'Deploy',
            status: 'pending',
          },
        },
        {
          id: 'monitor',
          type: 'monitor',
          position: { x: 900, y: 100 },
          data: {
            label: 'Monitor',
            status: 'pending',
          },
        },
      ],
      edges: [
        { id: 'e1-2', source: 'source', target: 'build' },
        { id: 'e2-3', source: 'build', target: 'test' },
        { id: 'e3-4', source: 'test', target: 'deploy' },
        { id: 'e4-5', source: 'deploy', target: 'monitor' },
      ],
    },
  },
  {
    id: 'mobile',
    name: 'Mobile Application',
    description: 'iOS and Android app development with automated testing and deployment',
    icon: 'Smartphone',
    defaultPipeline: {
      name: 'Mobile App Pipeline',
      description: 'CI/CD pipeline for mobile applications',
      applicationType: 'mobile',
      status: 'idle',
      nodes: [
        {
          id: 'source',
          type: 'custom',
          position: { x: 100, y: 100 },
          data: {
            label: 'Source Code',
            status: 'pending',
          },
        },
        {
          id: 'build-ios',
          type: 'build',
          position: { x: 300, y: 50 },
          data: {
            label: 'Build iOS',
            status: 'pending',
          },
        },
        {
          id: 'build-android',
          type: 'build',
          position: { x: 300, y: 150 },
          data: {
            label: 'Build Android',
            status: 'pending',
          },
        },
        {
          id: 'test',
          type: 'test',
          position: { x: 500, y: 100 },
          data: {
            label: 'Test',
            status: 'pending',
          },
        },
        {
          id: 'deploy',
          type: 'deploy',
          position: { x: 700, y: 100 },
          data: {
            label: 'Deploy to Stores',
            status: 'pending',
          },
        },
      ],
      edges: [
        { id: 'e1-2', source: 'source', target: 'build-ios' },
        { id: 'e1-3', source: 'source', target: 'build-android' },
        { id: 'e2-4', source: 'build-ios', target: 'test' },
        { id: 'e3-4', source: 'build-android', target: 'test' },
        { id: 'e4-5', source: 'test', target: 'deploy' },
      ],
    },
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    description: 'ML model training, testing, and deployment pipelines',
    icon: 'Brain',
    defaultPipeline: {
      name: 'ML Pipeline',
      description: 'Machine learning model development and deployment pipeline',
      applicationType: 'ml',
      status: 'idle',
      nodes: [
        {
          id: 'data',
          type: 'custom',
          position: { x: 100, y: 100 },
          data: {
            label: 'Data Collection',
            status: 'pending',
          },
        },
        {
          id: 'preprocess',
          type: 'build',
          position: { x: 300, y: 100 },
          data: {
            label: 'Data Preprocessing',
            status: 'pending',
          },
        },
        {
          id: 'train',
          type: 'test',
          position: { x: 500, y: 100 },
          data: {
            label: 'Model Training',
            status: 'pending',
          },
        },
        {
          id: 'evaluate',
          type: 'test',
          position: { x: 700, y: 100 },
          data: {
            label: 'Model Evaluation',
            status: 'pending',
          },
        },
        {
          id: 'deploy',
          type: 'deploy',
          position: { x: 900, y: 100 },
          data: {
            label: 'Model Deployment',
            status: 'pending',
          },
        },
      ],
      edges: [
        { id: 'e1-2', source: 'data', target: 'preprocess' },
        { id: 'e2-3', source: 'preprocess', target: 'train' },
        { id: 'e3-4', source: 'train', target: 'evaluate' },
        { id: 'e4-5', source: 'evaluate', target: 'deploy' },
      ],
    },
  },
];
