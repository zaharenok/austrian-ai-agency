"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇦🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Определение текущей локали из пути
  const currentLocale = pathname.split('/')[1];
  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];
  
  // Формирование нового пути при переключении языка
  const switchLanguage = (locale: string) => {
    const newPathname = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPathname);
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
    setOpen(false);
  };

  return (
    <div className="relative">
      <Button 
        onClick={() => setOpen(!open)} 
        variant="ghost" 
        className="flex items-center gap-2"
      >
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </Button>
      
      {open && (
        <div className="absolute top-full right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-zinc-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => switchLanguage(language.code)}
                className={cn(
                  "w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700 flex items-center gap-2",
                  language.code === currentLocale && "bg-gray-100 dark:bg-zinc-700"
                )}
                role="menuitem"
              >
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};