import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'de', 'ru'];
export const defaultLocale = 'en';

// Функция для получения предпочитаемой локали из заголовков запроса
function getLocaleFromHeaders(request: NextRequest): string | undefined {
  const acceptLanguageHeader = request.headers.get('accept-language');
  if (acceptLanguageHeader) {
    const acceptedLanguages = acceptLanguageHeader
      .split(',')
      .map(item => item.split(';')[0].trim());
    
    for (const lang of acceptedLanguages) {
      const locale = locales.find(l => lang.startsWith(l));
      if (locale) return locale;
    }
  }
  return undefined;
}

export function middleware(request: NextRequest) {
  // Получаем путь из URL
  const { pathname } = request.nextUrl;
  
  // Проверяем, есть ли локаль в URL
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // Если в URL уже есть локаль, не делаем редирект
  if (pathnameHasLocale) return NextResponse.next();
  
  // Если это API запрос или запрос к статическим файлам, не делаем редирект
  if (pathname.startsWith('/api/') || 
      pathname.startsWith('/_next') || 
      pathname.includes('.')) {
    return NextResponse.next();
  }
  
  // Получаем локаль из Cookie, либо из заголовков запроса, либо используем дефолтную
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const locale = cookieLocale || getLocaleFromHeaders(request) || defaultLocale;
  
  // Создаем новый URL с добавлением локали в путь
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};