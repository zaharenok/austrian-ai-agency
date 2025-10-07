# Инструкция по развертыванию на Hostinger

## 📋 Подготовка файлов

1. **Создание статической сборки:**
   ```bash
   npm run build:static
   ```

2. **Создание архива:**
   ```bash
   cd out
   zip -r ../aaa-website-static.zip .
   cd ..
   ```

## 📁 Загрузка через панель Hostinger

### Шаг 1: Войти в панель управления
1. Зайдите на https://www.hostinger.com/
2. Нажмите **"Войти"** и введите свои данные
3. Перейдите в **"Управление хостингом"**

### Шаг 2: Открыть файловый менеджер
1. В панели управления найдите раздел **"Файлы"**
2. Нажмите **"Диспетчер файлов"** (File Manager)
3. Откроется веб-интерфейс файлового менеджера

### Шаг 3: Перейти в папку сайта
1. В файловом менеджере найдите папку **`public_html`**
2. Войдите в неё - это корневая папка вашего сайта
3. **⚠️ ВАЖНО**: Если в `public_html` есть файлы, создайте резервную копию или удалите их

### Шаг 4: Загрузить архив
1. В файловом менеджере нажмите кнопку **"Загрузить"** (Upload)
2. Выберите файл `aaa-website-static-with-chat.zip` с вашего компьютера (обновленная версия с рабочим чатом)
3. Дождитесь завершения загрузки

### Шаг 5: Распаковать архив
1. Найдите загруженный файл `aaa-website-static-with-chat.zip` в `public_html`
2. **Правой кнопкой мыши** кликните на архив
3. Выберите **"Извлечь"** (Extract)
4. Убедитесь, что извлечение происходит в папку `public_html`
5. Нажмите **"Извлечь"**

### Шаг 6: Очистка
1. После извлечения удалите архив `aaa-website-static-with-chat.zip`
2. Убедитесь, что файлы извлечены правильно

## 🔧 Настройка .htaccess

### Шаг 7: Создание файла .htaccess
1. В папке `public_html` создайте файл `.htaccess`
2. Добавьте в него следующий код:

```apache
# Redirect all requests to index.html for SPA routing
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [QSA,L]

# Cache static assets
<filesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
  ExpiresActive on
  ExpiresDefault "access plus 1 month"
</filesMatch>

# Enable gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

## ✅ Проверка установки

### Шаг 8: Структура файлов
После извлечения в `public_html` должны быть:
- 📁 `_next/` - статические ресурсы Next.js
- 📁 `en/` - английская версия
- 📁 `de/` - немецкая версия  
- 📁 `ru/` - русская версия
- 📄 `index.html` - главная страница
- 📄 `404.html` - страница ошибки
- 📄 `favicon.ico` - иконка сайта
- 📄 `.htaccess` - правила Apache (созданный вами)

### Шаг 9: Тестирование сайта
1. Откройте ваш домен в браузере
2. Проверьте мультиязычность:
   - `your-domain.com/en` - английский
   - `your-domain.com/de` - немецкий
   - `your-domain.com/ru` - русский
3. **Проверьте ЧАТ на контактных страницах:**
   - `your-domain.com/en/contact` - отправьте сообщение на английском
   - `your-domain.com/de/contact` - отправьте сообщение на немецком
   - `your-domain.com/ru/contact` - отправьте сообщение на русском
4. **Проверьте N8N webhook:** сообщения должны приходить в ваш N8N workflow с параметром `language`

## ✅ Исправления для статической версии

### 🎉 Что РАБОТАЕТ в обновленной статической версии:
- **Чат-функциональность** (прямое обращение к N8N webhook)
- N8N webhook интеграция с параметром `language`
- Мультиязычная поддержка
- Все UI компоненты и анимации

### ⚠️ Ограничения:
- Middleware для автоопределения языка (нужно вручную выбирать язык)
- Серверные API маршруты

### 🔧 Решения для чата:

**Вариант 1: VPS хостинг**
- Используйте VPS план Hostinger
- Следуйте инструкции для серверного развертывания

**Вариант 2: Прямая интеграция с N8N**
- Изменить чат для прямой отправки в N8N webhook
- Обойти серверный API

## 🚀 Обновление сайта

Для обновления сайта:
1. Внесите изменения в код
2. Выполните `npm run build:static`
3. Создайте новый архив из папки `out`
4. Загрузите и распакуйте в `public_html`
5. Очистите кэш браузера

## 🆘 Troubleshooting

### Проблема: Страницы не открываются
**Решение**: Проверьте настройки `.htaccess`

### Проблема: Стили не загружаются
**Решение**: Убедитесь, что папка `_next` загружена полностью

### Проблема: 404 ошибка на подстраницах
**Решение**: Проверьте правила RewriteRule в `.htaccess`

### Проблема: Сайт показывает default Apache страницу
**Решение**: Убедитесь, что файлы в `public_html`, а не в подпапке

---

✅ **После успешного развертывания ваш сайт Austrian AI Agency будет доступен с поддержкой трех языков!**