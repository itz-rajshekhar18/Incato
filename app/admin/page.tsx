'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { database } from '@/lib/firebase';
import { ref, onValue, off } from 'firebase/database';

interface RampWalkData {
  name: string;
  batchNo: string;
  whyDeserve: string;
  crazyFlex: string;
  timestamp: string;
  submittedAt: number;
  registrationType: string;
}

interface PerformanceData {
  performanceType: string;
  otherPerformance?: string;
  duration: string;
  props?: string;
  numberOfPeople: string;
  teamMemberNames?: string;
  timestamp: string;
  submittedAt: number;
  registrationType: string;
}

export default function AdminPage() {
  const [rampWalkData, setRampWalkData] = useState<Record<string, RampWalkData>>({});
  const [performanceData, setPerformanceData] = useState<Record<string, PerformanceData>>({});
  const [activeTab, setActiveTab] = useState<'rampWalk' | 'performance'>('rampWalk');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reference to rampWalk data
    const rampWalkRef = ref(database, 'rampWalk');
    const performanceRef = ref(database, 'performance');

    // Listen for rampWalk data
    const unsubscribeRampWalk = onValue(rampWalkRef, (snapshot) => {
      const data = snapshot.val();
      setRampWalkData(data || {});
      setLoading(false);
    });

    // Listen for performance data
    const unsubscribePerformance = onValue(performanceRef, (snapshot) => {
      const data = snapshot.val();
      setPerformanceData(data || {});
    });

    // Cleanup listeners on unmount
    return () => {
      off(rampWalkRef);
      off(performanceRef);
    };
  }, []);

  const rampWalkEntries = Object.entries(rampWalkData);
  const performanceEntries = Object.entries(performanceData);

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-5xl font-bold font-[family-name:var(--font-orbitron)] bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 font-[family-name:var(--font-orbitron)]">
                Manage all registrations for Incanto 2026
              </p>
            </div>
            <Link href="/homepage">
              <motion.button
                className="px-6 py-3 bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700 rounded-xl text-gray-300 font-medium backdrop-blur-sm transition-all duration-300 font-[family-name:var(--font-orbitron)]"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(113,113,122,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                View Homepage
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-gray-400 font-[family-name:var(--font-orbitron)] text-sm mb-2">
              Ramp Walk Registrations
            </h3>
            <p className="text-4xl font-bold text-white font-[family-name:var(--font-orbitron)]">
              {rampWalkEntries.length}
            </p>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-gray-400 font-[family-name:var(--font-orbitron)] text-sm mb-2">
              Performance Registrations
            </h3>
            <p className="text-4xl font-bold text-white font-[family-name:var(--font-orbitron)]">
              {performanceEntries.length}
            </p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-4 mb-6"
        >
          <button
            onClick={() => setActiveTab('rampWalk')}
            className={`px-6 py-3 rounded-xl font-[family-name:var(--font-orbitron)] font-medium transition-all duration-300 ${
              activeTab === 'rampWalk'
                ? 'bg-gradient-to-r from-zinc-700 to-zinc-600 text-white'
                : 'bg-zinc-900/50 text-gray-400 hover:text-white border border-zinc-800'
            }`}
          >
            Ramp Walk ({rampWalkEntries.length})
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-6 py-3 rounded-xl font-[family-name:var(--font-orbitron)] font-medium transition-all duration-300 ${
              activeTab === 'performance'
                ? 'bg-gradient-to-r from-zinc-700 to-zinc-600 text-white'
                : 'bg-zinc-900/50 text-gray-400 hover:text-white border border-zinc-800'
            }`}
          >
            Performance ({performanceEntries.length})
          </button>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-400 font-[family-name:var(--font-orbitron)]">Loading data...</p>
          </div>
        )}

        {/* Ramp Walk Data */}
        {!loading && activeTab === 'rampWalk' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {rampWalkEntries.length === 0 ? (
              <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-8 text-center">
                <p className="text-gray-400 font-[family-name:var(--font-orbitron)]">
                  No ramp walk registrations yet
                </p>
              </div>
            ) : (
              rampWalkEntries.map(([id, data], index) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white font-[family-name:var(--font-orbitron)]">
                      {data.name}
                    </h3>
                    <span className="text-xs text-gray-500 font-[family-name:var(--font-orbitron)]">
                      {new Date(data.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm font-[family-name:var(--font-orbitron)] mb-1">
                        Batch No.
                      </p>
                      <p className="text-white font-[family-name:var(--font-orbitron)]">{data.batchNo}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-[family-name:var(--font-orbitron)] mb-1">
                        Registration Type
                      </p>
                      <p className="text-white font-[family-name:var(--font-orbitron)]">{data.registrationType}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-gray-400 text-sm font-[family-name:var(--font-orbitron)] mb-1">
                        Why deserve Miss/Mr. Freshers?
                      </p>
                      <p className="text-white font-[family-name:var(--font-orbitron)]">{data.whyDeserve}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-gray-400 text-sm font-[family-name:var(--font-orbitron)] mb-1">
                        Crazy Flex
                      </p>
                      <p className="text-white font-[family-name:var(--font-orbitron)]">{data.crazyFlex}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* Performance Data */}
        {!loading && activeTab === 'performance' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {performanceEntries.length === 0 ? (
              <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-8 text-center">
                <p className="text-gray-400 font-[family-name:var(--font-orbitron)]">
                  No performance registrations yet
                </p>
              </div>
            ) : (
              performanceEntries.map(([id, data], index) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white font-[family-name:var(--font-orbitron)]">
                      {data.performanceType} {data.otherPerformance && `(${data.otherPerformance})`}
                    </h3>
                    <span className="text-xs text-gray-500 font-[family-name:var(--font-orbitron)]">
                      {new Date(data.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm font-[family-name:var(--font-orbitron)] mb-1">
                        Duration
                      </p>
                      <p className="text-white font-[family-name:var(--font-orbitron)]">{data.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-[family-name:var(--font-orbitron)] mb-1">
                        Number of People
                      </p>
                      <p className="text-white font-[family-name:var(--font-orbitron)]">{data.numberOfPeople}</p>
                    </div>
                    {data.props && (
                      <div className="md:col-span-2">
                        <p className="text-gray-400 text-sm font-[family-name:var(--font-orbitron)] mb-1">
                          Props Needed
                        </p>
                        <p className="text-white font-[family-name:var(--font-orbitron)]">{data.props}</p>
                      </div>
                    )}
                    {data.teamMemberNames && (
                      <div className="md:col-span-2">
                        <p className="text-gray-400 text-sm font-[family-name:var(--font-orbitron)] mb-1">
                          Team Members
                        </p>
                        <p className="text-white font-[family-name:var(--font-orbitron)] whitespace-pre-line">
                          {data.teamMemberNames}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
