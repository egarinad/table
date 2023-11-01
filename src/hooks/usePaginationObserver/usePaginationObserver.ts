import { useRef, useEffect, useState, RefObject } from 'react';

interface UsePaginationObserverReturnType {
  elementWidth: number;
  targetRef: RefObject<HTMLDivElement>;
}

export const usePaginationObserver = (): UsePaginationObserverReturnType => {
  const [elementWidth, setElementWidth] = useState<number>(3);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        if (entry.contentRect.width >= 900 && elementWidth !== 9) {
          setElementWidth(9);
        } else if (entry.contentRect.width >= 700 && elementWidth !== 7) {
          setElementWidth(7);
        } else if (entry.contentRect.width >= 500 && elementWidth !== 5) {
          setElementWidth(5);
        } else {
          setElementWidth(3);
        }
      });
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return { elementWidth, targetRef };
};
