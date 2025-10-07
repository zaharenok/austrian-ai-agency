# Инструкция для AI агента: как правильно собрать проект

## ГЛАВНОЕ ПРАВИЛО
Когда собираешь проект командой `npm run build:static`, ОБЯЗАТЕЛЬНО проверь что в файле `src/app/[locale]/layout.tsx` функция `generateStaticParams()` НЕ закомментирована (строки 46-52).

Если она закомментирована (начинается с //), раскомментируй её!

## Что делать для полной сборки

### Шаг 1: Запусти сборку
```bash
npm run build:static
```

### Шаг 2: Проверь результат
После сборки посмотри что в папке `out/` есть ВСЕ эти папки:
- out/en/
- out/de/
- out/ru/

Каждая должна содержать index.html и папку contact/

### Шаг 3: Если папок en/de/ru нет - скопируй вручную
Запусти эти команды:
```bash
mkdir -p out/en out/de out/ru out/en/contact out/de/contact out/ru/contact
cp .next/server/app/en.html out/en/index.html
cp .next/server/app/de.html out/de/index.html
cp .next/server/app/ru.html out/ru/index.html
cp .next/server/app/en/contact.html out/en/contact/index.html
cp .next/server/app/de/contact.html out/de/contact/index.html
cp .next/server/app/ru/contact.html out/ru/contact/index.html
```

### Шаг 4: Создай архив для загрузки
```bash
mkdir -p deployment
cd out
tar -czf ../deployment/aaa-website-static-export.tar.gz .
```

## Частые проблемы

**В out/ нет папок en/de/ru**
→ Проверь что `generateStaticParams()` в layout.tsx раскомментирован (строки 46-52)

**Ошибки про translations и %5Blocale%5D**
→ Это нормально, игнорируй

## Что должно получиться
В папке `out/` должно быть:
```
out/
├── en/index.html ✓
├── en/contact/index.html ✓
├── de/index.html ✓
├── de/contact/index.html ✓
├── ru/index.html ✓
├── ru/contact/index.html ✓
├── _next/ ✓
├── 404.html ✓
└── другие файлы
```

Архив готов в: `deployment/aaa-website-static-export.tar.gz`

## Для загрузки на хостинг
Распакуй содержимое архива в папку public_html на хостинге.
