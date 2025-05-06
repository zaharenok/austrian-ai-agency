"use client";

import { useEffect, useRef } from "react";

/**
 * Хук для автоматической прокрутки контейнера при добавлении нового контента
 * @param dependency массив зависимостей, при изменении которых будет происходить прокрутка
 * @param smooth включить плавную прокрутку
 */
export function useAutoScroll<T extends HTMLElement>(
  dependency: any[],
  smooth: boolean = true
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const scrollContainer = ref.current;
    if (smooth) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth",
      });
    } else {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [...dependency]);

  return ref;
}