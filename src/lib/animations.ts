
import { animate } from "motion";

/**
 * Slides an element in with an animation
 * @param element The DOM element to animate
 * @param direction The direction to slide from ('up', 'down', 'left', 'right')
 */
export const slideIn = (element: HTMLElement, direction: 'up' | 'down' | 'left' | 'right') => {
  // Direction mapping
  const directionMap = {
    up: { y: [50, 0] },
    down: { y: [-50, 0] },
    left: { x: [50, 0] },
    right: { x: [-50, 0] }
  };
  
  // Get animation properties
  const animationProps = directionMap[direction];
  
  // Animate the element
  animate(
    element,
    {
      opacity: [0, 1],
      ...animationProps
    },
    {
      duration: 0.5,
      easing: [0.22, 0.03, 0.26, 1]
    }
  );
};

/**
 * Scale element in with an animation
 * @param element The DOM element to animate
 */
export const scaleIn = (element: HTMLElement) => {
  animate(
    element,
    { 
      scale: [0.95, 1],
      opacity: [0, 1]
    },
    {
      duration: 0.5,
      easing: [0.22, 0.03, 0.26, 1]
    }
  );
};

/**
 * Fade element in with an animation
 * @param element The DOM element to animate
 */
export const fadeIn = (element: HTMLElement) => {
  animate(
    element,
    { opacity: [0, 1] },
    {
      duration: 0.5,
      easing: [0.22, 0.03, 0.26, 1]
    }
  );
};

/**
 * Animate a number with counting effect
 * @param element The DOM element to update
 * @param start Starting value
 * @param end Ending value
 * @param formatter Function to format the number (optional)
 */
export const animateNumber = (
  element: HTMLElement, 
  start: number, 
  end: number, 
  formatter: (value: number) => string = (val) => val.toString()
) => {
  let currentValue = start;
  const duration = 1000; // 1 second
  const startTime = performance.now();
  
  const updateValue = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    
    // Easing function for smoother animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    
    currentValue = start + (end - start) * easeOutQuart;
    element.textContent = formatter(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(updateValue);
    } else {
      element.textContent = formatter(end); // Ensure we end on the exact value
    }
  };
  
  requestAnimationFrame(updateValue);
};
