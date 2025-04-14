import { useState, useEffect, useRef, RefObject } from "react";

interface UseInViewOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

export function useInView({
  root = null,
  rootMargin = "0px",
  threshold = 0,
  triggerOnce = false,
}: UseInViewOptions = {}): [RefObject<HTMLElement>, boolean] {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Skip if already triggered and triggerOnce is true
        if (triggerOnce && hasTriggered.current) return;

        setIntersecting(entry.isIntersecting);

        if (entry.isIntersecting && triggerOnce) {
          hasTriggered.current = true;
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, triggerOnce]);

  return [ref, isIntersecting];
}
