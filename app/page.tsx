"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-[#212529]">
      {/* Navigation Bar */}
      <header className="w-full px-8 py-4 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            DevOpsSim
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/simulator"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Simulator
            </Link>
            <Link
              href="/learn"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Learn More
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="text-center py-20 md:py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              From Code to Cloud: Master CI/CD Interactively
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A hands-on DevOps pipeline simulator for students. Visualize,
              troubleshoot, and understand the entire CI/CD workflow without any
              setup.
            </p>
            <Link
              href="/application-selection"
              className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
            >
              Start Simulation
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            {/* Card 1 */}
            <div className="p-8 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-blue-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2 1M4 7l2-1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Interactive Simulation</h3>
              <p className="text-gray-600">
                Visualize every stage of a real-world CI/CD pipeline, from
                build to deployment.
              </p>
            </div>
            {/* Card 2 */}
            <div className="p-8 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-red-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Failure & Recovery</h3>
              <p className="text-gray-600">
                Learn to troubleshoot common errors and practice recovery
                scenarios in a safe environment.
              </p>
            </div>
            {/* Card 3 */}
            <div className="p-8 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Multiple Scenarios</h3>
              <p className="text-gray-600">
                Explore pipelines for web apps, mobile apps, and even ML
                models to broaden your skills.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full text-center p-6 bg-white border-t border-gray-200">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} DevOps Pipeline Simulator. Created for CSE
          Students.
        </p>
      </footer>
    </div>
  );

}