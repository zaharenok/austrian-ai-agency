"use client";

import { useTranslations } from '@/context/language-context';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function VetWhatsAppButton() {
  const { t } = useTranslations();

  const handleWhatsAppClick = () => {
    // Replace with actual WhatsApp number
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '43XXXXXXXXX';
    const message = encodeURIComponent(t('vetcall.whatsappButton'));
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');

    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'whatsapp_clicked'
      });
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 1 }}
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 px-6 py-4 group"
      aria-label={t('vetcall.whatsappButton')}
    >
      <MessageCircle className="h-6 w-6 animate-pulse" />
      <span className="hidden sm:inline font-medium">
        {t('vetcall.whatsappButton')}
      </span>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
    </motion.button>
  );
}
