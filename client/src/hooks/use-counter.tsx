import { useState, useEffect } from "react";

interface UseCounterProps {
  start?: number;
  end: number;
  duration?: number;
  enabled?: boolean;
}

export function useCounter({
  start = 0,
  end,
  duration = 2,
  enabled = true
}: UseCounterProps): number {
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    if (!enabled) return;
    
    const step = (end - start) / (duration * 60); // 60 frames per second
    let currentCount = start;
    const timer = setInterval(() => {
      currentCount += step;
      
      if (currentCount >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(currentCount);
      }
    }, 1000 / 60);
    
    return () => clearInterval(timer);
  }, [start, end, duration, enabled]);
  
  return count;
}
