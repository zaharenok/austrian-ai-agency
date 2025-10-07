"use client";

import { useRef } from 'react';

/**
 * Simplified scroll boundary hook - just returns a ref
 * Native browser scrolling handles boundaries automatically
 */
export function useScrollBoundary() {
  const boundaryRef = useRef<HTMLDivElement>(null);
  return boundaryRef;
}
