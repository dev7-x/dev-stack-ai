"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^\d+$/, "Phone must contain only numbers"),
  message: z.string().min(20, "Inquiry must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactCard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Form Data:", data);
      setIsSuccess(true);
      toast.success("🚀 Message received! Dev will contact you within 24 hours.");
      reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-obsidian px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,191,36,0.05),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.05),_transparent_60%)]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="grid md:grid-cols-2 items-stretch">
            {/* Left Section - CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-12 md:p-16 bg-gradient-to-br from-monster via-monster to-monster/80 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-6xl font-black text-black leading-tight mb-6"
                >
                  Ready to <br />Build Your <br />Monster?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-black/80 font-semibold text-lg leading-relaxed"
                >
                  Let's discuss your project. Send an inquiry and I'll get back to you within 24 hours to schedule a discovery call.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative z-10 mt-12 pt-8 border-t border-black/20 space-y-3"
              >
                <div>
                  <p className="text-sm font-semibold text-black/70 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-lg font-bold text-black">dev.naren0703@gmail.com</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-black/70 uppercase tracking-wider mb-1">Agency</p>
                  <p className="text-lg font-bold text-black">Dev-Stack Consulting</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Section - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-12 md:p-16 bg-cardbg/40 border-l border-white/5 backdrop-blur-sm"
            >
              {isSuccess ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="p-4 rounded-full bg-monster/20 border border-monster mb-6"
                  >
                    <CheckCircle className="w-12 h-12 text-monster" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">Message Received!</h3>
                  <p className="text-gray-400 mb-6">
                    Thanks for reaching out. I'll review your inquiry and get back to you soon.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      reset();
                    }}
                    className="px-6 py-2 rounded-lg border border-monster text-monster hover:bg-monster/10 font-semibold transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Full Name *</label>
                    <input
                      {...register("name")}
                      placeholder="Devendra"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-monster focus:ring-2 focus:ring-monster/20 transition-all"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.name.message}
                      </motion.div>
                    )}
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Email *</label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-monster focus:ring-2 focus:ring-monster/20 transition-all"
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.email.message}
                        </motion.div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Phone *</label>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="Your phone number"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-monster focus:ring-2 focus:ring-monster/20 transition-all"
                        disabled={isSubmitting}
                      />
                      {errors.phone && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone.message}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Project Inquiry *</label>
                    <textarea
                      {...register("message")}
                      placeholder="Tell me about your project, goals, and timeline..."
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-monster focus:ring-2 focus:ring-monster/20 transition-all resize-none min-h-[120px]"
                      disabled={isSubmitting}
                    />
                    {errors.message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.message.message}
                      </motion.div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-6 rounded-lg bg-monster text-black hover:bg-monster/90 disabled:bg-monster/50 disabled:cursor-not-allowed font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <span>Send Inquiry</span>
                        <span>→</span>
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-500 text-center">
                    I'll respond within 24 hours. No spam, ever.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}