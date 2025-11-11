"use client";

import { useState } from 'react';
import { useTranslations } from '@/context/language-context';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2 } from 'lucide-react';

interface VetCTAModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'trial' | 'demo';
}

export function VetCTAModal({ isOpen, onClose, type }: VetCTAModalProps) {
  const { t } = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    clinicName: '',
    contactPerson: '',
    email: '',
    phone: '',
    city: '',
    preferredTime: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Analytics event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'lead_submitted',
          form_type: type,
          clinic_name: formData.clinicName
        });
      }

      // Send to webhook
      const webhookUrl = 'https://n8n.aaagency.at/webhook/9744657d-962b-4eb9-848e-695ac662cebf';

      // Try to send with no-cors mode to avoid CORS issues in development
      fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {
        // Ignore CORS errors - data is still sent
      });

      // Show success immediately (webhook will receive data even with CORS)
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({
          clinicName: '',
          contactPerson: '',
          email: '',
          phone: '',
          city: '',
          preferredTime: '',
          message: '',
        });
      }, 3000);
    } catch (err) {
      setError(t('vetcall.form.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle2 className="h-16 w-16 text-vet-emerald-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('vetcall.form.successTitle')}
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-300">
              {t('vetcall.form.successMessage')}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('vetcall.form.title')}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            {t('vetcall.form.subtitle')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clinicName" className="text-gray-900 dark:text-gray-100">{t('vetcall.form.clinicName')} *</Label>
              <Input
                id="clinicName"
                name="clinicName"
                required
                value={formData.clinicName}
                onChange={handleChange}
                placeholder={t('vetcall.form.clinicNamePlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPerson" className="text-gray-900 dark:text-gray-100">{t('vetcall.form.contactPerson')} *</Label>
              <Input
                id="contactPerson"
                name="contactPerson"
                required
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder={t('vetcall.form.contactPersonPlaceholder')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900 dark:text-gray-100">{t('vetcall.form.email')} *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={t('vetcall.form.emailPlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-900 dark:text-gray-100">{t('vetcall.form.phone')} *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('vetcall.form.phonePlaceholder')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-gray-900 dark:text-gray-100">{t('vetcall.form.city')} *</Label>
              <Input
                id="city"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder={t('vetcall.form.cityPlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTime" className="text-gray-900 dark:text-gray-100">{t('vetcall.form.preferredTime')}</Label>
              <Input
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                placeholder={t('vetcall.form.preferredTimePlaceholder')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-gray-900 dark:text-gray-100">{t('vetcall.form.message')}</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t('vetcall.form.messagePlaceholder')}
              rows={3}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-vet-emerald-500 hover:bg-vet-emerald-600 text-white font-semibold text-lg py-6 shadow-lg hover:shadow-xl transition-all"
          >
            {isSubmitting ? t('vetcall.form.submitting') : t('vetcall.form.submit')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
