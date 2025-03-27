
import { animate, spring } from "motion";

export const fadeIn = (element: HTMLElement, delay: number = 0) => {
  animate(
    element,
    { opacity: [0, 1], y: [20, 0] },
    { delay, duration: 0.5, easing: spring() }
  );
};

export const slideIn = (element: HTMLElement, direction: 'left' | 'right' | 'up' | 'down' = 'up', delay: number = 0) => {
  const x = direction === 'left' ? [-20, 0] : direction === 'right' ? [20, 0] : [0, 0];
  const y = direction === 'up' ? [-20, 0] : direction === 'down' ? [20, 0] : [0, 0];
  
  animate(
    element,
    { opacity: [0, 1], x, y },
    { delay, duration: 0.5, easing: spring() }
  );
};

export const scaleIn = (element: HTMLElement, delay: number = 0) => {
  animate(
    element,
    { opacity: [0, 1], scale: [0.95, 1] },
    { delay, duration: 0.4, easing: spring() }
  );
};

export const animateNumber = (
  element: HTMLElement, 
  start: number, 
  end: number, 
  duration: number = 1,
  formatter: (value: number) => string = (value) => value.toFixed(0)
) => {
  let startTime: number | null = null;
  
  const updateNumber = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    
    const progress = Math.min(elapsed / (duration * 1000), 1);
    const currentValue = start + (end - start) * progress;
    
    element.textContent = formatter(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  };
  
  requestAnimationFrame(updateNumber);
};
