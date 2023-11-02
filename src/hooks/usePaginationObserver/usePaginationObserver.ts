import { useRef, useEffect, useState, RefObject } from 'react';

interface UsePaginationObserverReturnType {
  targetRef: RefObject<HTMLDivElement>;
  visiblePages: number;
}

/**
 * A custom React hook that observes the width of a target DOM element and dynamically calculates the number of visible pages
 * based on specific breakpoints. It provides a ref object for the target element and the number of visible pages.
 *
 * @function
 * @returns {UsePaginationObserverReturnType} An object containing the ref object for the target element and the number of visible pages.
 * @property {RefObject<HTMLDivElement>} targetRef - ref object for the target HTMLDivElement.
 * @property {number} visiblePages - number of visible pages based on the width of the observed element (3, 5, 7, or 9).
 *
 * @example
 * const { targetRef, visiblePages } = usePaginationObserver();
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver ResizeObserver
 */
export const usePaginationObserver = (): UsePaginationObserverReturnType => {
  const [visiblePages, setVisiblePages] = useState<number>(3);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        if (entry.contentRect.width >= 900 && visiblePages !== 9) {
          setVisiblePages(9);
        } else if (entry.contentRect.width >= 700 && visiblePages !== 7) {
          setVisiblePages(7);
        } else if (entry.contentRect.width >= 500 && visiblePages !== 5) {
          setVisiblePages(5);
        } else {
          setVisiblePages(3);
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

  return { targetRef, visiblePages };
};
