'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { database } from '@/lib/firebase';
import { ref, push } from 'firebase/database';

export default function PerformancePage() {
  const [activeNav, setActiveNav] = useState('performance');
  const [formData, setFormData] = useState({
    performanceType: '',
    otherPerformance: '',
    duration: '',
    props: '',
    numberOfPeople: '',
    teamMemberNames: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navItems = [
    { name: 'Home', href: '/homepage' },
    { name: 'Event Brochure', href: '/brochure' },
    { name: 'Ramp Walk', href: '/ramp-walk' },
    { name: 'Performance', href: '/performance' },
  ];

  const performanceOptions = [
    'Dance',
    'Song',
    'Stand-up',
    'Mimicry',
    'Act',
    'Poetry',
    'Others'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a reference to the performance collection
      const performanceRef = ref(database, 'performance');
      
      // Add timestamp and registration type to the data
      const dataToSubmit = {
        ...formData,
        registrationType: 'performance',
        timestamp: new Date().toISOString(),
        submittedAt: Date.now()
      };

      // Push data to Firebase
      await push(performanceRef, dataToSubmit);

      alert('Performance registration submitted successfully!');
      
      // Reset form
      setFormData({
        performanceType: '',
        otherPerformance: '',
        duration: '',
        props: '',
        numberOfPeople: '',
        teamMemberNames: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col overflow-hidden relative scrollbar-hide">
      {/* Navbar */}
      <motion.nav 
        className="relative z-50 px-6 py-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link href="/">
                <span className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-orbitron)] bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
                  INCANTO
                </span>
              </Link>
            </motion.div>

            {/* Nav Items */}
            <div className="hidden md:flex items-center gap-2 bg-zinc-900/60 backdrop-blur-md border border-zinc-800/50 rounded-full px-3 py-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={item.href}>
                    <motion.button
                      onClick={() => setActiveNav(item.name.toLowerCase())}
                      className={`relative px-6 py-2.5 rounded-full font-[family-name:var(--font-orbitron)] text-sm font-medium transition-all duration-300 ${
                        activeNav === item.name.toLowerCase()
                          ? 'text-white'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {activeNav === item.name.toLowerCase() && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.name}</span>
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 py-12 relative overflow-y-auto scrollbar-hide">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[150px]"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[150px]"
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 30, -20, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

        <main className="relative z-10 w-full max-w-2xl mx-auto">
          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 md:p-12"
          >
            {/* Heading */}
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 font-[family-name:var(--font-orbitron)] bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent break-words"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Performance Registration
            </motion.h1>
            
            <motion.p 
              className="text-center text-gray-400 mb-8 font-[family-name:var(--font-orbitron)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Register your performance for Incanto
            </motion.p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Performance Type */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label htmlFor="performanceType" className="block text-gray-300 font-medium mb-2 font-[family-name:var(--font-orbitron)] text-sm">
                  What do you want to perform?
                </label>
                <select
                  id="performanceType"
                  name="performanceType"
                  value={formData.performanceType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-zinc-500 transition-all duration-300 font-[family-name:var(--font-orbitron)]"
                >
                  <option value="">Select performance type</option>
                  {performanceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Other Performance (conditional) */}
              {formData.performanceType === 'Others' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="otherPerformance" className="block text-gray-300 font-medium mb-2 font-[family-name:var(--font-orbitron)] text-sm">
                    Please specify
                  </label>
                  <input
                    type="text"
                    id="otherPerformance"
                    name="otherPerformance"
                    value={formData.otherPerformance}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-all duration-300 font-[family-name:var(--font-orbitron)]"
                    placeholder="Specify your performance type"
                  />
                </motion.div>
              )}

              {/* Duration */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label htmlFor="duration" className="block text-gray-300 font-medium mb-2 font-[family-name:var(--font-orbitron)] text-sm">
                  How long will the performance be?
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-all duration-300 font-[family-name:var(--font-orbitron)]"
                  placeholder="e.g., 5 minutes"
                />
              </motion.div>

              {/* Props */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label htmlFor="props" className="block text-gray-300 font-medium mb-2 font-[family-name:var(--font-orbitron)] text-sm">
                  If props needed, what will it be?
                </label>
                <textarea
                  id="props"
                  name="props"
                  value={formData.props}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-all duration-300 resize-none font-[family-name:var(--font-orbitron)]"
                  placeholder="List the props you need (or write 'None')"
                />
              </motion.div>

              {/* Number of People */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <label htmlFor="numberOfPeople" className="block text-gray-300 font-medium mb-2 font-[family-name:var(--font-orbitron)] text-sm">
                  How many people are performing with you?
                </label>
                <input
                  type="number"
                  id="numberOfPeople"
                  name="numberOfPeople"
                  value={formData.numberOfPeople}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-all duration-300 font-[family-name:var(--font-orbitron)]"
                  placeholder="Enter number (0 if solo)"
                />
              </motion.div>

              {/* Team Member Names (conditional) */}
              {formData.numberOfPeople && parseInt(formData.numberOfPeople) > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="teamMemberNames" className="block text-gray-300 font-medium mb-2 font-[family-name:var(--font-orbitron)] text-sm">
                    Please give their names
                  </label>
                  <textarea
                    id="teamMemberNames"
                    name="teamMemberNames"
                    value={formData.teamMemberNames}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-all duration-300 resize-none font-[family-name:var(--font-orbitron)]"
                    placeholder="Enter team member names (one per line)"
                  />
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-zinc-700 to-zinc-600 text-white font-bold rounded-xl font-[family-name:var(--font-orbitron)] text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isSubmitting ? { 
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(113,113,122,0.5)"
                  } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
