"use client";
import { motion } from "framer-motion";
import { Award, TrendingUp, Database, Zap } from "lucide-react";

const caseStudies = [
  {
    id: 1,
    title: "Modernized Cancer Support Mallorca",
    description: "Built a comprehensive volunteer and patient management tracking tool to streamline healthcare coordination.",
    impact: "50+ volunteers coordinated",
    technologies: ["React", "Node.js", "PostgreSQL", "Real-time Sync"],
    icon: Award,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    id: 2,
    title: "CHINTU's Cafe - QR Table Management",
    description: "Solved real-time ordering problem with innovative QR code-based table management system for seamless customer experience.",
    impact: "70% faster service",
    technologies: ["Next.js", "Supabase", "QR.js", "Real-time DB"],
    icon: Zap,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
  },
  {
    id: 3,
    title: "Complex Care Solutions - Data Excellence",
    description: "Implemented sophisticated data validation in transformation and enrichment layers using PySpark with performance optimization in Databricks.",
    impact: "99.8% data accuracy",
    technologies: ["PySpark", "Databricks", "SQL", "Data Pipeline"],
    icon: Database,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
  },
  {
    id: 4,
    title: "EBG Solutions - Modern Data Platform",
    description: "Architected modern data platform leveraging Snowflake with automated job orchestration in Airflow and Python scripts for enterprise scalability.",
    impact: "Real-time analytics",
    technologies: ["Snowflake", "Airflow", "Python", "Data Warehouse"],
    icon: TrendingUp,
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function SuccessfulDeliveries() {
  return (
    <section id="deliveries" className="py-24 bg-obsidian text-white px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.1),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.05),_transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Successful <span className="text-monster">Deliveries</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real-world projects where I've transformed complex business challenges into production-ready solutions.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {caseStudies.map((study) => {
            const Icon = study.icon;
            return (
              <motion.div
                key={study.id}
                variants={itemVariants}
                className={`group relative overflow-hidden rounded-2xl border ${study.borderColor} bg-gradient-to-br ${study.color} p-8 backdrop-blur-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent" />

                <div className="relative z-10">
                  {/* Header with Icon */}
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-2xl font-bold pr-6 leading-tight">{study.title}</h3>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex-shrink-0">
                      <Icon className="w-6 h-6 text-monster" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-6">{study.description}</p>

                  {/* Impact Metric */}
                  <div className="mb-6 p-4 rounded-lg bg-white/5 border border-monster/30">
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Key Impact</p>
                    <p className="text-lg font-bold text-monster">{study.impact}</p>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      Technologies Used
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-white/90 hover:bg-monster hover:bg-opacity-20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Border Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-monster to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-lg text-gray-400 mb-6">Ready to transform your business like these clients?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-monster text-black hover:bg-monster/90 font-bold transition-all duration-300 hover:scale-105"
          >
            Let's Start Your Journey
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
