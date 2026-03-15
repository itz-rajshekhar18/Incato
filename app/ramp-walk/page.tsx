'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { database } from '@/lib/firebase';
import { ref, push } from 'firebase/database';

export default function RampWalkPage() {
  const [activeNav, setActiveNav] = useState('ramp walk');
  const [formData, setFormData] = useState({
    name: '',
    batchNo: '',
    whyDeserve: '',
    crazyFlex: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navItems = [
    { name: 'Home', href: '/homepage' },
    { name: 'Event Brochure', href: '/brochure' },
    { name: 'Ramp Walk', href: '/ramp-walk' },
    { name: 'Performance', href: '/performance' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a reference to the rampWalk collection
      const rampWalkRef = ref(database, 'rampWalk');
      
      // Add timestamp and registration type to the data
      const dataToSubmit = {
        ...formData,
        registrationType: 'rampWalk',
        timestamp: new Date().toISOString(),
        submittedAt: Date.now()
      };

      // Push data to Firebase
      await push(rampWalkRef, dataToSubmit);

      alert('Registration submitted successfully!');
      
      // Reset form
      setFormData({
        name: '',
        batchNo: '',
        whyDeserve: '',
        crazyFlex: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col overflow-hidden relative">
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
      <div className="flex-1 flex items-center justify-center p-4 relative">
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
              className="text-4xl md:text-5xl font-bold text-center mb-3 font-[family-name:var(--font-orbitron)] bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Ramp Walk Registration
            </motion.h1>
            
            <motion.p 
              className="text-center text-gray-400 mb-8 font-[family-name:var(--font-orbitron)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Register for Miss/Mr. Freshers
            </motion.p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label htmlFor="name" className="block text-gray-300 font-medium mb-2 font-[family-name:var(--font-orbitron)] text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-all duration-300 font-[family-name:var(--font-orbitron)]"
                  placeholder="Enter your full name"
                />
              </motion.div>

              {/* Batch No */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label htmlFor="batchNo" className="block text-gray-300 font-medium mb-2 font-[family-name:var(--font-orbitron)] text-sm">
                  Batch No.
                </label>
                <input
                  type="text"
                  id="batchNo"
                  name="batchNo"
                  value={formData.batchNo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-all duration-300 font-[family-name:var(--font-orbitron)]"
                  placeholder="Enter your batch number"
                />
              </motion.div>

              {/* Why do you deserve */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label htmlFor="whyDeserve" className="block text-gray-300 font-medium mb-2 font-[family-name:var(--font-orbitron)] text-sm">
                  Why do you deserve to be the Miss/Mr. Freshers?
                </label>
                <textarea
                  id="whyDeserve"
                  name="whyDeserve"
                  value={formData.whyDeserve}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-all duration-300 resize-none font-[family-name:var(--font-orbitron)]"
                  placeholder="Tell us why you deserve this title..."
                />
              </motion.div>

              {/* Crazy Flex */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <label htmlFor="crazyFlex" className="block text-gray-300 font-medium mb-2 font-[family-name:var(--font-orbitron)] text-sm">
                  What is your most crazy flex?
                </label>
                <textarea
                  id="crazyFlex"
                  name="crazyFlex"
                  value={formData.crazyFlex}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-all duration-300 resize-none font-[family-name:var(--font-orbitron)]"
                  placeholder="Share your most crazy flex..."
                />
              </motion.div>

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
