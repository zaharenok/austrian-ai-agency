# Blog API Usage Guide

Этот документ показывает, как использовать API для добавления статей в блог через хуки.

## Использование хука useBlog

```typescript
import { useBlog, useQuickPost } from '@/hooks/use-blog';

// Полный хук для работы с блогом
const { createPost, updatePost, deletePost, getPosts, getPost, loading } = useBlog();

// Быстрый хук для создания постов
const { quickCreate, loading } = useQuickPost();
```

## Создание статьи через API

### Метод 1: Использование createPost

```typescript
const createNewPost = async () => {
  const result = await createPost({
    title: "Новая статья о машинном обучении",
    description: "Подробное руководство по внедрению ML в бизнес",
    content: `
# Машинное обучение в бизнесе

Машинное обучение становится неотъемлемой частью современного бизнеса...

## Основные преимущества

1. Автоматизация процессов
2. Улучшение точности прогнозов
3. Персонализация клиентского опыта

## Практические примеры

### Финтех
- Обнаружение мошенничества
- Кредитный скоринг
- Алгоритмическая торговля

### E-commerce
- Рекомендательные системы
- Динамическое ценообразование
- Прогнозирование спроса
    `,
    category: "machine-learning",
    tags: ["ml", "бизнес", "автоматизация"],
    locale: "ru",
    author: "Austrian AI Agency",
    published: true
  });

  if (result.success) {
    console.log('Статья создана:', result.slug);
  } else {
    console.error('Ошибка:', result.error);
  }
};
```

### Метод 2: Использование quickCreate

```typescript
const createQuickPost = async () => {
  const result = await quickCreate(
    "Тренды ИИ в 2025 году",
    `
# Искусственный интеллект в 2025 году

Рассматриваем ключевые тенденции развития ИИ...

## Генеративный ИИ

Новые модели и их применение в бизнесе.

## Автоматизация

Интеграция ИИ в корпоративные процессы.
    `,
    "ru",
    {
      description: "Обзор главных трендов в области искусственного интеллекта",
      category: "ai",
      tags: ["ии", "тренды", "2025"],
      author: "Эксперты Austrian AI Agency"
    }
  );

  if (result.success) {
    console.log('Быстрая статья создана:', result.slug);
  }
};
```

## Прямые API запросы

### Создание статьи через fetch

```typescript
const createPostDirectly = async () => {
  const response = await fetch('/api/blog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: "Автоматизация с помощью ИИ",
      description: "Как искусственный интеллект меняет процессы автоматизации",
      content: "# Полный контент статьи в Markdown\n\nТекст статьи...",
      category: "automation",
      tags: ["ии", "автоматизация", "процессы"],
      locale: "ru",
      author: "Austrian AI Agency",
      published: true
    })
  });

  const result = await response.json();
  console.log('Результат:', result);
};
```

### Получение списка статей

```typescript
const fetchPosts = async () => {
  const response = await fetch('/api/blog?locale=ru&category=ai');
  const data = await response.json();
  console.log('Статьи:', data.posts);
};
```

### Получение конкретной статьи

```typescript
const fetchPost = async (slug: string) => {
  const response = await fetch(`/api/blog/${slug}?locale=ru`);
  const data = await response.json();
  console.log('Статья:', data.post);
};
```

## Компонент для создания статей

```typescript
'use client';

import { useState } from 'react';
import { useQuickPost } from '@/hooks/use-blog';

export function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { quickCreate, loading } = useQuickPost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await quickCreate(title, content, 'ru', {
      category: 'general',
      tags: ['новость']
    });

    if (result.success) {
      alert('Статья создана!');
      setTitle('');
      setContent('');
    } else {
      alert('Ошибка: ' + result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Заголовок:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label>Контент (Markdown):</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Создание...' : 'Создать статью'}
      </button>
    </form>
  );
}
```

## Структура файлов блога

Статьи сохраняются в следующей структуре:

```
src/content/blog/
├── en/
│   ├── article-slug.md
│   └── another-article.md
├── de/
│   ├── artikel-slug.md
│   └── weiterer-artikel.md
└── ru/
    ├── статья-слаг.md
    └── другая-статья.md
```

## Frontmatter формат

Каждая статья должна содержать метаданные в начале файла:

```yaml
---
title: "Заголовок статьи"
description: "Краткое описание"
date: "2024-12-15"
category: "ai"
tags:
  - "искусственный интеллект"
  - "бизнес"
author: "Имя автора"
published: true
image: "/images/blog/image.jpg"
---
```

## Категории

Доступные категории:
- `ai` - Искусственный интеллект
- `machine-learning` - Машинное обучение
- `automation` - Автоматизация
- `technology` - Технологии
- `business` - Бизнес
- `general` - Общее
- `tutorials` - Руководства
- `case-studies` - Кейсы
- `news` - Новости

## SEO и метаданные

Каждая статья автоматически получает:
- Динамические meta tags
- Open Graph данные
- Twitter Card метаданные
- JSON-LD разметка (планируется)
- Автоматический расчет времени чтения