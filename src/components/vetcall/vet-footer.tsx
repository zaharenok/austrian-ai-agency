"use client";

import Link from 'next/link';
import { useTranslations } from '@/context/language-context';
import { Stethoscope, Mail, Phone } from 'lucide-react';

export function VetCallFooter() {
  const { t, locale } = useTranslations();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="rounded-lg bg-gradient-to-br from-vet-emerald-500 to-vet-teal-600 p-2">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">VetCall AI</span>
            </div>
            <p className="text-gray-400 mb-4">
              {t('vetcall.hero.title')}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:contact@vetcall.ai" className="hover:text-vet-emerald-400 transition-colors">
                  contact@vetcall.ai
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+43XXXXXXXXX" className="hover:text-vet-emerald-400 transition-colors">
                  +43 XXX XXX XXX
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t('vetcall.navigation.home')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/vet#pricing`} className="hover:text-vet-emerald-400 transition-colors">
                  {t('vetcall.navigation.pricing')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/vet#faq`} className="hover:text-vet-emerald-400 transition-colors">
                  {t('vetcall.navigation.faq')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/vet/contact`} className="hover:text-vet-emerald-400 transition-colors">
                  {t('vetcall.navigation.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/vet/privacy`} className="hover:text-vet-emerald-400 transition-colors">
                  {t('vetcall.navigation.privacy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/vet/impressum`} className="hover:text-vet-emerald-400 transition-colors">
                  {t('vetcall.navigation.impressum')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500">
            © {new Date().getFullYear()} VetCall AI. {t('footer.rights')}
          </p>
          <p className="text-gray-500 mt-2 md:mt-0">
            Powered by <Link href={`/${locale}`} className="text-vet-emerald-400 hover:text-vet-emerald-300">Austrian AI Agency</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
