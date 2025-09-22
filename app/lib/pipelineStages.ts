export const pipelineStages = [
  {
    id: 'source',
    label: 'Source',
    description: 'Fetch code from repository.',
    learnMoreUrl: 'https://www.atlassian.com/continuous-delivery/continuous-integration/source-code-management',
  },
  {
    id: 'preprocessing',
    label: 'Preprocessing',
    description: 'Prepare code and environment for build.',
    learnMoreUrl: 'https://www.geeksforgeeks.org/data-preprocessing-machine-learning/',
  },
  {
    id: 'build',
    label: 'Build',
    description: 'Compile and package the application.',
    learnMoreUrl: 'https://www.jenkins.io/doc/book/pipeline/build/',
  },
  {
    id: 'test',
    label: 'Test',
    description: 'Run automated tests.',
    learnMoreUrl: 'https://www.guru99.com/continuous-testing.html',
  },
  {
    id: 'deploy',
    label: 'Deploy',
    description: 'Deploy application to environment.',
    learnMoreUrl: 'https://www.redhat.com/en/topics/devops/what-is-ci-cd',
  },
  // Add more stages as needed
];