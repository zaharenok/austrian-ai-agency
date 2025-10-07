"use client";

import { useEffect, useRef } from "react";

/**
 * Хук для автоматической прокрутки контейнера при добавлении нового контента
 * @param dependency массив зависимостей, при изменении которых будет происходить прокрутка
 * @param smooth включить плавную прокрутку
 */
export function useAutoScroll<T extends HTMLElement>(
  dependency: unknown[],
  smooth: boolean = true
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const scrollContainer = ref.current;
    
    // Предотвращаем пропагацию событий скролла наверх
    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      
      // Предотвращаем скролл родительского контейнера когда достигли границ
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
    };
    
    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
    
    // Автоскролл
    const scrollToBottom = () => {
      if (smooth) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: "smooth",
        });
      } else {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    };
    
    // Небольшая задержка для обеспечения рендеринга контента
    const timeoutId = setTimeout(scrollToBottom, 50);
    
    return () => {
      clearTimeout(timeoutId);
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, [...dependency, smooth]);

  return ref;
}