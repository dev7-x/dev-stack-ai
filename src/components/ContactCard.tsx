"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle, ChevronDown, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { countryCodes } from "@/config/countryCodes";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  countryCode: z.string().min(1, "Country code is required"),
  phone: z.string().min(6, "Phone number must be valid").regex(/^\d+$/, "Phone must contain only numbers"),
  message: z.string().min(20, "Inquiry must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactCard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return countryCodes;
    
    const query = searchQuery.toLowerCase();
    return countryCodes.filter(
      (country) =>
        country.country.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      countryCode: countryCodes[0].code,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit inquiry");
      }

      setIsSuccess(true);
      toast.success("🚀 Inquiry sent! Check your email for confirmation.");
      reset({ countryCode: countryCodes[0].code });
      setSelectedCountry(countryCodes[0]);
      
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-obsidian px-6 relative overflow-hidden">
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
                    Thanks for reaching out. Your inquiry has been recorded and automatically sent to my email. I'll contact you soon!
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      reset({ countryCode: countryCodes[0].code });
                      setSelectedCountry(countryCodes[0]);
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
                    <label className="block text-sm font-semibold text-white mb-2">Full Name*</label>
                    <input
                      {...register("name")}
                      placeholder="Your name"
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

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Email*</label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="you@company/email.com"
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

                  {/* Phone with Country Code */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Phone*</label>
                    <div className="flex gap-3">
                      {/* Country Code Dropdown */}
                      <div className="relative w-32">
                        <button
                          type="button"
                          onClick={() => setShowDropdown(!showDropdown)}
                          className="w-full px-3 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:border-monster/50 focus:outline-none focus:border-monster focus:ring-2 focus:ring-monster/20 transition-all flex items-center justify-between"
                        >
                          <span className="text-sm font-semibold">{selectedCountry.code}</span>
                          <ChevronDown className="w-4 h-4" />
                        </button>

                        {showDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-cardbg border border-white/10 rounded-lg shadow-xl z-50 w-72"
                          >
                            {/* Search Input */}
                            <div className="sticky top-0 p-3 border-b border-white/5 bg-cardbg/95 backdrop-blur-sm rounded-t-lg">
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                  type="text"
                                  placeholder="Search country..."
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-monster focus:ring-1 focus:ring-monster/20 text-sm transition-all"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>
                            </div>

                            {/* Country List */}
                            <div className="max-h-64 overflow-y-auto">
                              {filteredCountries.length > 0 ? (
                                filteredCountries.map((country, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCountry(country);
                                      setValue("countryCode", country.code);
                                      setShowDropdown(false);
                                      setSearchQuery("");
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-white hover:bg-monster/20 transition-colors flex items-center gap-2 border-b border-white/5 last:border-b-0"
                                  >
                                    <span className="text-base">{country.flag}</span>
                                    <span className="font-semibold min-w-12">{country.code}</span>
                                    <span className="text-gray-400 text-xs truncate">{country.country}</span>
                                  </button>
                                ))
                              ) : (
                                <div className="px-4 py-8 text-center text-gray-400 text-sm">
                                  No countries found
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Phone Number Input */}
                      <input
                        {...register("countryCode")}
                        type="hidden"
                        value={selectedCountry.code}
                      />
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="Phone number"
                        className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-monster focus:ring-2 focus:ring-monster/20 transition-all"
                        disabled={isSubmitting}
                      />
                    </div>
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

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Project Inquiry*</label>
                    <textarea
                      {...register("message")}
                      placeholder="Tell me about your needs, project goals & any specific requirements..."
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-monster focus:ring-2 focus:ring-monster/20 transition-all resize-none min-h-[100px]"
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
                    Your details will be tracked automatically. No spam, ever.
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
