"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Rocket, Zap, BarChart3 } from "lucide-react";

const steps = [
  {
    day: "01-02",
    title: "Ideation & Architecture",
    desc: "Deep-dive discovery call. Define business needs, technical requirements, system architecture, database schema, and RAG workflow endpoints.",
    icon: Zap,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    day: "03-05",
    title: "Rapid Execution & Build",
    desc: "Full-stack development sprint. MERN/Next.js implementation, API routes, AI agent integration, database setup, and first-mile deployment.",
    icon: Rocket,
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    day: "06-07",
    title: "Optimization & Go-Live",
    desc: "Performance tuning, security hardening, final testing, AWS/Vercel deployment, rapid go-live monitoring, and handoff documentation.",
    icon: BarChart3,
    color: "from-green-500/20 to-emerald-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Timeline() {
  return (
    <section className="py-24 bg-obsidian relative overflow-hidden px-6">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.05),_transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            The 7-Day <span className="text-monster">Monster</span> Cycle
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A battle-tested process for delivering production-ready solutions from concept to live launch.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${step.color} p-8 backdrop-blur-md hover:border-monster/50 hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              >
                {/* Inner Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent" />

                {/* Step Number */}
                <div className="relative z-10 flex items-start justify-between mb-6">
                  <div>
                    <p className="text-monster font-black text-5xl mb-1">Day {step.day}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 group-hover:bg-monster group-hover:bg-opacity-20 transition-all duration-300">
                    <Icon className="w-6 h-6 text-monster" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  {step.title}
                  <CheckCircle2 className="w-5 h-5 text-monster opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed">{step.desc}</p>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-monster to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Timeline Connector (Desktop only) */}
        <div className="hidden md:flex justify-between mt-8 px-8">
          {[0, 1].map((idx) => (
            <div
              key={idx}
              className="flex-1 h-1 bg-gradient-to-r from-monster/30 to-monster/0 mx-4"
            />
          ))}
        </div>
      </div>
    </section>
  );
}