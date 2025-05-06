"use client";
 
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send } from "lucide-react";
import confetti from "canvas-confetti";
import { useTranslations } from "@/context/language-context";
 
export interface ContactFormProps {
  onSubmit: (formData: {
    email: string;
    name: string;
    message: string;
    company?: string;
  }) => Promise<void>;
  className?: string;
}
 
export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  className = "",
}) => {
  const { t } = useTranslations();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
    company: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
 
    // Валидация формы
    if (!formData.email || !formData.name || !formData.message) {
      setError(t("contactForm.validationError"));
      return;
    }
 
    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(t("contactForm.emailError"));
      return;
    }
 
    setIsSubmitting(true);
 
    try {
      await onSubmit(formData);
      setIsSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      setError(t("contactForm.submitError"));
    } finally {
      setIsSubmitting(false);
    }
  };
 
  return (
    <div
      className={`bg-secondary/50 backdrop-blur-lg border border-primary/10 rounded-lg p-6 max-w-lg mx-auto ${className}`}
    >
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex items-start justify-center gap-1 flex-col overflow-y-hidden">
              <motion.h2
                className="text-2xl font-bold text-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {t("contactForm.title")}
              </motion.h2>
              <motion.p
                className="text-muted-foreground text-sm"
                initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.4 }}
              >
                {t("contactForm.description")}
              </motion.p>
            </div>
            
            <div className="space-y-2">
              <motion.label
                initial={{ opacity: 0, filter: "blur(3px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.5 }}
                className="font-medium text-sm"
                htmlFor="name"
              >
                {t("contactForm.nameLabel")}
              </motion.label>
              <motion.input
                initial={{ opacity: 0, filter: "blur(3px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.6 }}
                type="text"
                id="name"
                name="name"
                placeholder={t("contactForm.namePlaceholder")}
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus-visible:ring-0 focus-within:ring-0 focus:outline-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <motion.label
                initial={{ opacity: 0, filter: "blur(3px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.7 }}
                className="font-medium text-sm"
                htmlFor="email"
              >
                {t("contactForm.emailLabel")}
              </motion.label>
              <motion.input
                initial={{ opacity: 0, filter: "blur(3px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.8 }}
                type="email"
                id="email"
                name="email"
                placeholder={t("contactForm.emailPlaceholder")}
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus-visible:ring-0 focus-within:ring-0 focus:outline-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <motion.label
                initial={{ opacity: 0, filter: "blur(3px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.9 }}
                className="font-medium text-sm"
                htmlFor="company"
              >
                {t("contactForm.companyLabel")}
              </motion.label>
              <motion.input
                initial={{ opacity: 0, filter: "blur(3px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 1.0 }}
                type="text"
                id="company"
                name="company"
                placeholder={t("contactForm.companyPlaceholder")}
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus-visible:ring-0 focus-within:ring-0 focus:outline-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <motion.label
                initial={{ opacity: 0, filter: "blur(3px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 1.1 }}
                className="font-medium text-sm"
                htmlFor="message"
              >
                {t("contactForm.messageLabel")}
              </motion.label>
              <motion.textarea
                initial={{ opacity: 0, filter: "blur(3px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 1.2 }}
                id="message"
                name="message"
                rows={4}
                placeholder={t("contactForm.messagePlaceholder")}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus-visible:ring-0 focus-within:ring-0 focus:outline-white/10"
              />
            </div>
            
            <motion.div
              className="flex justify-end mt-2"
              initial={{ opacity: 0, filter: "blur(3px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 1.3 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative overflow-hidden text-sm flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t("contactForm.submitting")}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send className="h-4 w-4 mr-2" />
                    {t("contactForm.submit")}
                  </div>
                )}
              </button>
            </motion.div>
            
            <AnimatePresence>
              {error && (
                <motion.p
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t("contactForm.successTitle")}
            </h2>
            <p className="text-muted-foreground">
              {t("contactForm.successMessage")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};