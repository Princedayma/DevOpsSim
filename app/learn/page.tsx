// 'use client';

// import { motion } from 'framer-motion';
// import { BookOpen, PlayCircle, CheckCircle, Users, Award } from 'lucide-react';
// import Link from 'next/link';

// export default function Learn() {
//   const learningModules = [
//     {
//       id: 1,
//       title: 'DevOps Fundamentals',
//       description: 'Learn the core concepts and principles of DevOps',
//       completed: false,
//       icon: BookOpen,
//       url: 'https://www.geeksforgeeks.org/devops/devops-tutorial/',
//     },
//     {
//       id: 2,
//       title: 'CI/CD Best Practices',
//       description: 'Industry standards and patterns for continuous integration',
//       completed: false,
//       icon: PlayCircle,
//       url: 'https://www.geeksforgeeks.org/devops/what-is-ci-cd/',
//     },
//     {
//       id: 3,
//       title: 'Pipeline Troubleshooting',
//       description: 'Common issues and how to solve them',
//       completed: false,
//       icon: CheckCircle,
//       url: 'https://docs.singlestore.com/cloud/load-data/about-singlestore-pipelines/pipeline-troubleshooting/',
//     },
//     {
//       id: 4,
//       title: 'Tool Integration',
//       description: 'Popular DevOps tools and platforms',
//       completed: false,
//       icon: Users,
//       url: 'https://www.browserstack.com/guide/tools-for-devops',
//     },
//   ];

//   const features = [
//     {
//       icon: BookOpen,
//       title: 'Interactive Learning',
//       description: 'Hands-on modules with real-world scenarios',
//     },
//     {
//       icon: PlayCircle,
//       title: 'Video Tutorials',
//       description: 'Step-by-step video guides for each concept',
//     },
//     {
//       icon: CheckCircle,
//       title: 'Practice Exercises',
//       description: 'Test your knowledge with practical challenges',
//     },
//     {
//       icon: Award,
//       title: 'Progress Tracking',
//       description: 'Track your learning journey and achievements',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Header */}
//       <header className="w-full px-8 py-4 bg-white/80 backdrop-blur-md shadow-sm">
//         <nav className="max-w-6xl mx-auto flex justify-between items-center">
//           <Link
//             href="/"
//             className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
//           >
//             DevOpsSim
//           </Link>
//           <Link
//             href="/"
//             className="text-gray-600 hover:text-blue-600 transition-colors"
//           >
//             ← Back to Home
//           </Link>
//         </nav>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-6xl mx-auto px-4 py-12">
//         {/* Hero Section */}
//         <div className="text-center mb-12">
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
//           >
//             Learn DevOps with Interactive Modules
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="text-lg text-gray-600 max-w-2xl mx-auto"
//           >
//             Master DevOps concepts through hands-on learning modules, video tutorials, 
//             and practical exercises designed for students and professionals.
//           </motion.p>
//         </div>

//         {/* Learning Modules */}
//         <div className="mb-16">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
//             Learning Modules
//           </h2>
          
//           <div className="grid md:grid-cols-2 gap-6">
//             {learningModules.map((module, index) => {
//               const IconComponent = module.icon;
              
//               return (
//                 <motion.div
//                   key={module.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
//                 >
//                   <div className="flex items-start gap-4">
//                     <div className="flex-shrink-0">
//                       <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                         <IconComponent className="w-6 h-6 text-blue-600" />
//                       </div>
//                     </div>
                    
//                     <div className="flex-grow">
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                         {module.title}
//                       </h3>
//                       <p className="text-gray-600 mb-4">
//                         {module.description}
//                       </p>
                      
//                       <Link href={module.url} className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
//                         Start Learning
//                       </Link>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Features Section */}
//         <div className="mb-16">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
//             Why Learn with DevOpsSim?
//           </h2>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {features.map((feature, index) => {
//               const IconComponent = feature.icon;
              
//               return (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   className="text-center"
//                 >
//                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <IconComponent className="w-8 h-8 text-blue-600" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-600 text-sm">
//                     {feature.description}
//                   </p>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Call to Action */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center"
//         >
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             Ready to Start Learning?
//           </h2>
//           <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
//             Begin your DevOps journey with our interactive learning modules. 
//             Learn at your own pace and practice with real-world scenarios.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               href="/application-selection"
//               className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//             >
//               Start Simulation
//             </Link>
//             <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
//               Browse Modules
//             </button>
//           </div>
//         </motion.div>
//       </main>
//     </div>
//   );
// }

'use client';

import { motion } from 'framer-motion';
import { BookOpen, PlayCircle, CheckCircle, Users, Award } from 'lucide-react';
import Link from 'next/link';

export default function Learn() {
  const learningModules = [
    {
      id: 1,
      title: 'DevOps Fundamentals',
      description: 'Learn the core concepts and principles of DevOps',
      completed: false,
      icon: BookOpen,
      url: 'https://www.geeksforgeeks.org/devops/devops-tutorial/',
    },
    {
      id: 2,
      title: 'CI/CD Best Practices',
      description: 'Industry standards and patterns for continuous integration',
      completed: false,
      icon: PlayCircle,
      url: 'https://www.geeksforgeeks.org/devops/what-is-ci-cd/',
    },
    {
      id: 3,
      title: 'Pipeline Troubleshooting',
      description: 'Common issues and how to solve them',
      completed: false,
      icon: CheckCircle,
      url: 'https://docs.singlestore.com/cloud/load-data/about-singlestore-pipelines/pipeline-troubleshooting/',
    },
    {
      id: 4,
      title: 'Tool Integration',
      description: 'Popular DevOps tools and platforms',
      completed: false,
      icon: Users,
      url: 'https://www.browserstack.com/guide/tools-for-devops',
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Learning',
      description: 'Hands-on modules with real-world scenarios',
    },
    {
      icon: PlayCircle,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides for each concept',
    },
    {
      icon: CheckCircle,
      title: 'Practice Exercises',
      description: 'Test your knowledge with practical challenges',
    },
    {
      icon: Award,
      title: 'Progress Tracking',
      description: 'Track your learning journey and achievements',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="w-full px-8 py-4 bg-white/80 backdrop-blur-md shadow-sm">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            DevOpsSim
          </Link>
          <Link
            href="/"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Learn DevOps with Interactive Modules
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Master DevOps concepts through hands-on learning modules, video tutorials, 
            and practical exercises designed for students and professionals.
          </motion.p>
        </div>

        {/* Learning Modules */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Learning Modules
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {learningModules.map((module, index) => {
              const IconComponent = module.icon;
              
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {module.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {module.description}
                      </p>
                      
                      {/* External link opens in new tab */}
                      <a
                        href={module.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Start Learning
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why Learn with DevOpsSim?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Begin your DevOps journey with our interactive learning modules. 
            Learn at your own pace and practice with real-world scenarios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/application-selection"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Simulation
            </Link>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Browse Modules
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
