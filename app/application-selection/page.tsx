'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Brain, ArrowRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { applicationTypes } from '../lib/applicationTypes';
import { useEffect } from 'react';

const iconMap = {
  Globe,
  Smartphone,
  Brain,
};

export default function ApplicationSelection() {
  const { setSelectedApplicationType, setApplicationTypes } = useAppStore();

  useEffect(() => {
    // Initialize application types in the store
    setApplicationTypes(applicationTypes);
  }, [setApplicationTypes]);

  const handleSelectApplication = (type: 'web' | 'mobile' | 'ml') => {
    setSelectedApplicationType(type);
  };

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
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Choose Your Application Type
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Select the type of application you want to simulate a CI/CD pipeline for.
            Each type has different stages and challenges to explore.
          </motion.p>
        </div>

        {/* Application Type Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {applicationTypes.map((appType, index) => {
            const IconComponent = iconMap[appType.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={appType.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link
                  href={`/simulator?type=${appType.id}`}
                  onClick={() => handleSelectApplication(appType.id)}
                  className="block"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {appType.name}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {appType.description}
                      </p>
                      
                      <div className="flex items-center justify-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                        <span>Start Simulation</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What You'll Experience
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Interactive Pipeline</h3>
              <p className="text-gray-600 text-sm">
                Watch your pipeline execute step by step with real-time updates
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-yellow-600 font-bold">⚠</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Failure Scenarios</h3>
              <p className="text-gray-600 text-sm">
                Learn to troubleshoot common CI/CD issues and failures
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Logs</h3>
              <p className="text-gray-600 text-sm">
                Monitor detailed logs and metrics throughout the pipeline
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
