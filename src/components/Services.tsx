"use client";
import { motion } from "framer-motion";
import { Brain, Code2, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI & Automation",
    description: "Custom RAG workflows, LLM agents, and intelligent chatbots. Transform your business with cutting-edge AI solutions.",
    skills: ["LLM Agents", "RAG Workflows", "Chatbots", "Gen AI", "MCP"],
    color: "from-blue-500/20 to-purple-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    icon: Code2,
    title: "Full-stack Engineering",
    description: "Scalable products built with Next.js, TypeScript, and modern cloud infrastructure on AWS/Azure.",
    skills: ["Next.js", "React", "TypeScript", "Node.js", "AWS/Azure"],
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
  },
  {
    icon: BarChart3,
    title: "Data Intelligence",
    description: "Real-time analytics, data pipelines, and intelligent dashboards with Snowflake, Databricks, and Power BI.",
    skills: ["Snowflake", "Databricks", "Power BI", "SQL", "Airflow"],
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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

export default function Services() {
  return (
    <section className="py-24 bg-obsidian text-white px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.1),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.05),_transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            The Monster <span className="text-monster">Upgrade</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Three pillars of technical excellence to transform your business. From AI-powered intelligence to scalable infrastructure.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-2xl border ${service.borderColor} bg-gradient-to-br ${service.color} p-8 backdrop-blur-xl hover:scale-105 transition-all duration-300`}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <service.icon className="w-6 h-6 text-monster" />
                  </div>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>

                <p className="text-gray-300 leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="space-y-4">
                  <p className="text-sm font-semibold text-monster uppercase tracking-wider">Key Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {service.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 hover:bg-white/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Border Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-monster to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
