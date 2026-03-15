'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    const particleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10
    }));
    setParticles(particleArray);
  }, []);

  const navItems = [
    { name: 'Home', href: '/homepage' },
    { name: 'Event Brochure', href: '/brochure' },
    { name: 'Ramp Walk', href: '/ramp-walk' },
    { name: 'Performance', href: '/performance' },
  ];

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
        {/* Animated colorful gradient orbs */}
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
        <motion.div 
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/3 rounded-full blur-[150px]"
          animate={{
            x: [0, 20, -20, 0],
            y: [0, 20, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-gray-900/10 via-transparent to-transparent animate-pulse-slow" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/30"
            style={{
              left: `${particle.x}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ 
              y: '-100vh',
              x: [0, 50, -30, 50, 0],
              opacity: [0, 1, 1, 1, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}

        {/* Spotlight effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]" />

        <main className="relative z-10 text-center space-y-12 max-w-4xl mx-auto">
          {/* Main heading */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <motion.h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight font-[family-name:var(--font-orbitron)]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span 
                className="bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]"
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(255,255,255,0.3)",
                    "0 0 60px rgba(255,255,255,0.5)",
                    "0 0 20px rgba(255,255,255,0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                INCANTO
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-2xl sm:text-3xl md:text-4xl text-gray-400 font-light tracking-wide font-[family-name:var(--font-orbitron)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Welcome to the Future
            </motion.p>
          </motion.div>

          {/* Decorative line */}
          <motion.div 
            className="flex items-center justify-center gap-4 mt-16"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.div 
              className="h-px w-16 bg-gradient-to-r from-transparent to-zinc-600"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 1, delay: 1.1 }}
            />
            <motion.div 
              className="w-2 h-2 rounded-full bg-zinc-500"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="h-px w-16 bg-gradient-to-l from-transparent to-zinc-600"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 1, delay: 1.1 }}
            />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
