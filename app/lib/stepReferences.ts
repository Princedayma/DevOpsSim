export const stepReferences: Record<string, Record<string, string>> = {
  'Source Code': {
    'Fetch code from repository': 'https://www.w3schools.com/git/git_pull_from_remote.asp', // working Git tutorial
    'Clone repository': 'https://git-scm.com/docs/git-clone',
    'Checkout branch': 'https://www.geeksforgeeks.org/git/git-checkout-branch/',
    'Verify commit hash': 'https://www.geeksforgeeks.org/git/how-to-retrieve-the-hash-for-the-current-commit-in-git/',
    'Show commit details': 'https://git-scm.com/docs/git-show',
  },
  Preprocessing: {
    'Validate configuration files': 'https://en.wikipedia.org/wiki/Configuration_file',
    'Check environment variables': 'https://www.geeksforgeeks.org/environment-variables-in-linux/',
    'Prepare workspace': 'https://en.wikipedia.org/wiki/Workspace_(software_development)',
  },
  Build: {
    'Install dependencies': 'https://docs.npmjs.com/cli/v10/commands/npm-install',
    'Compile source code': 'https://en.wikipedia.org/wiki/Compiler',
    'Run linter': 'https://eslint.org/docs/latest/user-guide/getting-started',
    'Generate build artifacts': 'https://en.wikipedia.org/wiki/Build_automation',
  },
  Test: {
    'Run unit tests': 'https://en.wikipedia.org/wiki/Unit_testing',
    'Run integration tests': 'https://en.wikipedia.org/wiki/Integration_testing',
    'Generate test reports': 'https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts',
  },
  Deploy: {
    'Provision infrastructure': 'https://www.redhat.com/en/topics/automation/what-is-infrastructure-as-code-iac',
    'Upload artifacts': 'https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts',
    'Run deployment scripts': 'https://www.jenkins.io/doc/book/pipeline/deployment/',
    'Verify deployment': 'https://www.redhat.com/en/topics/devops/what-is-ci-cd',
  },

    FailureRecovery: {
  'Detect Exit Code': 'https://en.wikipedia.org/wiki/Exit_status',
  'Halt Job Execution': 'https://www.jenkins.io/doc/pipeline/steps/workflow-basic-steps/#catcherror-catch-error',
  'Log Error': 'https://en.wikipedia.org/wiki/Error_log',
  'Execute Conditional Steps': 'https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#if-expression-syntax-for-github-actions',
  'Cleanup Runner Environment': 'https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idcleanup',
  'Cancel Dependents': 'https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idneeds',
  'Final Workflow Status': 'https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/about-workflow-logs',
}


};
