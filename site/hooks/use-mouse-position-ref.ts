"use client";

import { RefObject, useEffect, useRef } from "react";

export function useMousePositionRef(
  containerRef: RefObject<HTMLElement | null>
) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      positionRef.current.x = event.clientX - centerX;
      positionRef.current.y = event.clientY - centerY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [containerRef]);

  return positionRef;
}
