/**
 * Defines the structure for a single sub-step within a pipeline stage.
 */
export interface PipelineSubStep {
  description: string;
  learnMoreUrl: string;
}

/**
 * Defines the structure for a main pipeline stage's data.
 */
export interface PipelineStageData {
  label: string;
  description: string;
  subSteps: PipelineSubStep[];
  showResultUrl: string; // <-- New property for your custom link
}

/**
 * The single, comprehensive source of truth for all pipeline stage definitions.
 */
export const pipelineStageData: Record<string, PipelineStageData> = {
  source: {
    label: 'Source',
    description: 'Fetch code from repository.',
    showResultUrl: 'https://drive.google.com/file/d/1Pca2GwADXG0rX7ChLn7jtwWcdRb-Qcnv/view?usp=drivesdk', // Customize this link
    subSteps: [
      { description: 'Fetch code', learnMoreUrl: 'https://www.w3schools.com/git/git_pull_from_remote.asp' },
      { description: 'Checkout branch', learnMoreUrl: 'https://www.geeksforgeeks.org/git/git-checkout-branch/' },
    ],
  },
  build: {
    label: 'Build',
    description: 'Compile and package the application.',
    showResultUrl: 'https://drive.google.com/file/d/1kZZrsMKF5K6VCplT1ufGM9FqpswrKDRQ/view?usp=drivesdk', // Customize this link
    subSteps: [
      { description: 'Install dependencies', learnMoreUrl: 'https://docs.npmjs.com/cli/v10/commands/npm-install' },
      { description: 'Compile source code', learnMoreUrl: 'https://en.wikipedia.org/wiki/Compiler' },
      { description: 'Run linter', learnMoreUrl: 'https://eslint.org/docs/latest/user-guide/getting-started' },
    ],
  },
  'build-ios': {
    label: 'Build iOS',
    description: 'Compile and package the iOS application.',
    showResultUrl: '/results/ios-build', // Customize this link
    subSteps: [
        { description: 'Install Pods', learnMoreUrl: 'https://guides.cocoapods.org/using/getting-started.html' },
        { description: 'Compile Swift/Objective-C', learnMoreUrl: 'https://www.swift.org/documentation/swift-compiler/' },
    ],
  },
  'build-android': {
    label: 'Build Android',
    description: 'Compile and package the Android application.',
    showResultUrl: '/results/android-build', // Customize this link
    subSteps: [
        { description: 'Run Gradle sync', learnMoreUrl: 'https://docs.gradle.org/current/dsl/org.gradle.api.tasks.Sync.html' },
        { description: 'Build APK/AAB', learnMoreUrl: 'https://developer.android.com/studio/build' },
    ],
  },
  test: {
    label: 'Test',
    description: 'Run automated tests.',
    showResultUrl: 'https://drive.google.com/file/d/1_qRQDmS8eRdQ3WMpPGYgpJM65C8KfnGm/view?usp=drivesdk', // Customize this link
    subSteps: [
      { description: 'Run unit tests', learnMoreUrl: 'https://en.wikipedia.org/wiki/Unit_testing' },
      { description: 'Run integration tests', learnMoreUrl: 'https://en.wikipedia.org/wiki/Integration_testing' },
    ],
  },
  deploy: {
    label: 'Deploy',
    description: 'Deploy application to environment.',
    showResultUrl: 'https://next-auth-rouge-ten.vercel.app/SignUp', // Customize this link
    subSteps: [
      { description: 'Provision infrastructure', learnMoreUrl: 'https://www.tierpoint.com/blog/infrastructure-provisioning/' },
      { description: 'Upload artifacts', learnMoreUrl: 'https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts' },
      { description: 'Verify deployment', learnMoreUrl: 'https://cloud.google.com/deploy/docs/verify-deployment' },
    ],
  },
  monitor: {
    label: 'Monitor',
    description: 'Monitor application health and performance.',
    showResultUrl: '/results/monitoring-dashboard', // Customize this link
    subSteps: [
      { description: 'Check application health', learnMoreUrl: 'https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html' },
      { description: 'Analyze performance metrics', learnMoreUrl: 'https://www.geeksforgeeks.org/machine-learning/metrics-for-machine-learning-model/' },
    ],
  },
  data: {
      label: 'Data Collection',
      description: 'Gather and prepare data for model training.',
      showResultUrl: '/results/data-summary', // Customize this link
      subSteps: [
        { description: 'Ingest data from sources', learnMoreUrl: 'https://en.wikipedia.org/wiki/Data_ingestion' },
        { description: 'Validate data quality', learnMoreUrl: 'https://en.wikipedia.org/wiki/Data_validation' },
      ],
  },
  preprocess: {
      label: 'Data Preprocessing',
      description: 'Clean and transform data.',
      showResultUrl: '/results/preprocessing-report', // Customize this link
      subSteps: [
        { description: 'Clean data', learnMoreUrl: 'https://en.wikipedia.org/wiki/Data_cleansing' },
        { description: 'Feature engineering', learnMoreUrl: 'https://en.wikipedia.org/wiki/Feature_engineering' },
      ],
  },
  train: {
      label: 'Model Training',
      description: 'Train the machine learning model.',
      showResultUrl: '/results/training-metrics', // Customize this link
      subSteps: [
        { description: 'Train model on dataset', learnMoreUrl: 'https://en.wikipedia.org/wiki/Training,_validation,_and_test_data_sets' },
        { description: 'Tune hyperparameters', learnMoreUrl: 'https://en.wikipedia.org/wiki/Hyperparameter_optimization' },
      ],
  },
  evaluate: {
      label: 'Model Evaluation',
      description: 'Evaluate the performance of the trained model.',
      showResultUrl: '/results/evaluation-report', // Customize this link
      subSteps: [
        { description: 'Evaluate with test set', learnMoreUrl: 'https://www.geeksforgeeks.org/machine-learning/metrics-for-machine-learning-model/' },
        { description: 'Generate performance metrics', learnMoreUrl: 'https://docs.ragas.io/en/v0.1.21/getstarted/testset_generation.html#get-started-testset-generation' },
      ],
  },
};

