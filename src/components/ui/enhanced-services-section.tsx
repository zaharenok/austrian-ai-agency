"use client";

import { motion } from "framer-motion";
import { Brain, Code, GraduationCap, Zap, Target, Users } from "lucide-react";
import { useTranslations } from "@/context/language-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const serviceIcons = {
  strategy: Target,
  development: Code,
  training: GraduationCap,
  consulting: Brain,
  automation: Zap,
  support: Users,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function EnhancedServicesSection() {
  const { t } = useTranslations();
  
  const services = [
    {
      key: 'strategy',
      icon: serviceIcons.strategy,
      badge: 'Popular',
      variant: 'default' as const,
    },
    {
      key: 'development',
      icon: serviceIcons.development,
      badge: 'Custom',
      variant: 'secondary' as const,
    },
    {
      key: 'training',
      icon: serviceIcons.training,
      badge: 'Interactive',
      variant: 'outline' as const,
    }
  ];
  
  return (
    <section className="container mx-auto py-20 px-4 sm:px-6">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            {t("services.title") || "AI Services"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("services.subtitle") || "Comprehensive AI solutions tailored to your business needs"}
          </p>
        </motion.div>
        <Separator className="max-w-24 mx-auto mt-8" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div key={service.key} variants={item}>
              <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-2 bg-card/50 backdrop-blur-lg border border-primary/10">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant={service.variant} className="text-xs">
                      {service.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {t(`services.${service.key}.title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {t(`services.${service.key}.description`)}
                  </CardDescription>
                  
                  {/* Optional: Add feature list */}
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="flex flex-wrap gap-2">
                      {t(`services.${service.key}.features`, { returnObjects: true }) instanceof Array &&
                        (t(`services.${service.key}.features`, { returnObjects: true }) as string[])
                          .slice(0, 3)
                          .map((feature: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Optional: Add CTA section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-16"
      >
        <Card className="bg-primary/5 border-primary/20 max-w-2xl mx-auto">
          <CardContent className="py-8">
            <h3 className="text-2xl font-bold mb-4">
              {t("services.cta.title") || "Ready to Transform Your Business?"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t("services.cta.description") || "Let's discuss how AI can revolutionize your operations"}
            </p>
            {/* Button would typically link to contact form */}
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}