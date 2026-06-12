"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, Check } from "lucide-react";

interface ResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceTitle: string;
}

export const ResourceModal = ({ isOpen, onClose, resourceTitle }: ResourceModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    agreed: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          resourceTitle,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to download resource");
      }

      // Handle the file download from the blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Nomyx-Why-Tokenize-My-Fund.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      // Success! Close modal
      onClose();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-ink/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] shadow-[0_32px_80px_rgba(10,17,40,0.15)] border border-border overflow-hidden pointer-events-auto"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 transition-colors text-ink-muted"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-ink mb-1">Unlock this Resource</h2>
                  <p className="text-sm text-ink-muted font-medium">
                    Enter your details to access <span className="text-ink font-semibold">{resourceTitle}</span>.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-[13px] font-bold text-ink mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-lg border border-border focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all outline-none text-ink text-sm placeholder:text-slate-400 font-medium"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[13px] font-bold text-ink mb-1.5">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-lg border border-border focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all outline-none text-ink text-sm placeholder:text-slate-400 font-medium"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-[13px] font-bold text-ink mb-1.5">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-lg border border-border focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all outline-none text-ink text-sm placeholder:text-slate-400 font-medium"
                    />
                  </div>

                  <div className="flex items-start gap-3 py-1">
                    <div className="relative flex items-center h-5">
                      <input
                        required
                        id="agreed"
                        name="agreed"
                        type="checkbox"
                        checked={formData.agreed}
                        onChange={handleChange}
                        className="peer h-4 w-4 rounded border-border text-accent focus:ring-accent transition-all cursor-pointer appearance-none border-2 checked:bg-accent checked:border-accent"
                      />
                      <Check className="absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none transition-opacity" strokeWidth={4} />
                    </div>
                    <label htmlFor="agreed" className="text-[12px] text-ink-muted font-medium leading-tight cursor-pointer">
                      I agree to the <a href="#" className="text-accent hover:underline">Terms & Conditions</a> and <a href="#" className="text-accent hover:underline">Privacy Policy</a>. *
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full h-12 bg-accent hover:bg-accent/90 text-white text-sm font-bold rounded-xl shadow-lg shadow-accent/20 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Download size={16} />
                        <span>Get Instant Access</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
