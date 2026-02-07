"use client";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-obsidian text-white overflow-hidden px-6">
      <div className="absolute top-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-monster/10 via-transparent to-transparent opacity-50" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <span className="px-4 py-1 border border-monster/30 rounded-full text-monster text-sm font-medium mb-6 inline-block bg-monster/5">
          🚀 7-Day MVP • Rapid Go-Live • 100% Ready
        </span>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          From Idea to <br /> <span className="text-monster underline decoration-white/10">Go-Live in 7 Days.</span>
        </h1>
        <p className="max-w-3xl text-xl text-gray-300 mb-10 mx-auto leading-relaxed">
          Expert Product Architect & Full-stack Developer helping you build modern SaaS, AI-powered systems, and high-performance data pipelines. I turn your business into a <span className="text-monster font-bold">MONSTER UPGRADE</span> with proven speed and technical depth.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="inline-flex items-center justify-center px-8 py-6 rounded-xl bg-monster text-black hover:bg-monster/90 font-bold transition-all duration-300 hover:scale-105">
            Let's Build Your Monster <Zap className="ml-2 w-5 h-5 fill-current" />
          </button>
          <button className="inline-flex items-center justify-center px-8 py-6 rounded-xl border border-white/20 text-white hover:border-white/40 hover:bg-white/5 font-bold transition-all duration-300">
            View My Work
          </button>
        </div>
      </motion.div>
    </section>
  );
}