"use client";

import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to handle scroll boundary behavior and prevent the footer "flying by" issue
 * Ensures proper scroll boundaries and stops scrolling at the footer
 */
export function useScrollBoundary() {
  const boundaryRef = useRef<HTMLDivElement>(null);

  const getMaxScroll = useCallback(() => {
    if (!boundaryRef.current) {
      return document.documentElement.scrollHeight - window.innerHeight;
    }

    const footer = boundaryRef.current;
    const footerTop = footer.offsetTop;
    const footerHeight = footer.offsetHeight;
    const viewportHeight = window.innerHeight;

    return Math.max(footerTop + footerHeight - viewportHeight, 0);
  }, []);

  const enforceScrollBoundary = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const maxScroll = getMaxScroll();

    if (scrollTop > maxScroll) {
      window.scrollTo({ top: maxScroll, behavior: 'auto' });
    }
  }, [getMaxScroll]);

  const handleScroll = useCallback((event: Event) => {
    // Prevent default overscroll behavior when at boundaries
    const scrollTop = window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = getMaxScroll();

    // At the top
    if (scrollTop <= 0) {
      window.scrollTo(0, 0);
      return;
    }

    // At the bottom
    if (scrollTop + viewportHeight >= documentHeight || scrollTop >= maxScroll) {
      window.scrollTo(0, maxScroll);
      return;
    }

    enforceScrollBoundary();
  }, [enforceScrollBoundary, getMaxScroll]);

  const handleWheel = useCallback((event: WheelEvent) => {
    const scrollTop = window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const maxScroll = getMaxScroll();

    // Prevent wheel events that would cause overscroll
    if ((scrollTop <= 0 && event.deltaY < 0) ||
        (scrollTop >= maxScroll && event.deltaY > 0)) {
      event.preventDefault();
      if (scrollTop >= maxScroll) {
        window.scrollTo({ top: maxScroll, behavior: 'auto' });
      }
      return false;
    }
  }, [getMaxScroll]);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    const scrollTop = window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const maxScroll = getMaxScroll();

    // Get touch coordinates
    const touch = event.touches[0];
    if (!touch) return;

    // Prevent touch moves that would cause overscroll
    if (scrollTop <= 0 || scrollTop >= maxScroll) {
      event.preventDefault();
      if (scrollTop >= maxScroll) {
        window.scrollTo({ top: maxScroll, behavior: 'auto' });
      }
      return false;
    }
  }, [getMaxScroll]);

  useEffect(() => {
    // Passive scroll listener for performance
    const scrollOptions: AddEventListenerOptions = { passive: true };
    const wheelOptions: AddEventListenerOptions = { passive: false };
    const touchOptions: AddEventListenerOptions = { passive: false };

    window.addEventListener('scroll', handleScroll, scrollOptions);
    window.addEventListener('wheel', handleWheel, wheelOptions);
    window.addEventListener('touchmove', handleTouchMove, touchOptions);

    // Initial boundary check
    enforceScrollBoundary();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleScroll, handleWheel, handleTouchMove, enforceScrollBoundary]);

  return boundaryRef;
}
