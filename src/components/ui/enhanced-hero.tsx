"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/context/language-context";

const TypingText = ({ texts }: { texts: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <span className="relative inline-block min-h-[1.2em]">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{
            duration: 0.5,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="absolute left-0 font-bold bg-gradient-to-r from-primary via-primary/80 to-spektr-cyan-400 bg-clip-text text-transparent"
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.6, 0], 
            scale: [0, 1, 0],
            x: Math.random() * 400,
            y: Math.random() * 400,
          }}
          transition={{
            duration: 4,
            delay: i * 1.5,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          <Sparkles className="w-6 h-6 text-spektr-cyan-300" />
        </motion.div>
      ))}
    </div>
  );
};

export function EnhancedHero() {
  const { t, locale } = useTranslations();
  const titles = useMemo(() => t("hero.titles"), [t]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <FloatingElements />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 sm:px-6 text-center z-10"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <Badge variant="outline" className="px-4 py-2 text-sm bg-background/50 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            {t("hero.badge") || "Austrian AI Agency"}
          </Badge>
        </motion.div>

        {/* Main Heading */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
            <span className="text-foreground">{t("hero.title")}</span>
            <br />
            <span className="relative inline-block w-full mt-2">
              {Array.isArray(titles) && (
                <TypingText texts={titles} />
              )}
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants} className="mb-10">
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("hero.description")}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href={`/${locale}/contact`}>
            <Button size="lg" className="group px-8 py-6 text-base">
              {t("cta.contact")}
              <Mail className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <Button variant="outline" size="lg" className="group px-8 py-6 text-base bg-background/50 backdrop-blur-sm">
            {t("cta.learnMore") || "Learn More"}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Stats or Social Proof */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { number: "50+", label: t("hero.stats.projects") || "Projects" },
            { number: "15+", label: t("hero.stats.clients") || "Clients" },
            { number: "5+", label: t("hero.stats.years") || "Years" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-spektr-cyan-50/20 pointer-events-none" />
    </section>
  );
}