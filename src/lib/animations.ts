
import { animate } from "motion";

/**
 * Slides an element in with an animation
 * @param element The DOM element or React ref to animate
 * @param direction The direction to slide from ('up', 'down', 'left', 'right')
 */
export const slideIn = (
  element: HTMLElement | React.RefObject<HTMLElement>,
  direction: 'up' | 'down' | 'left' | 'right'
) => {
  // Get the actual DOM element from a potential ref
  const targetElement = element instanceof HTMLElement ? element : element.current;
  
  if (!targetElement) return;
  
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
    targetElement,
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
 * @param element The DOM element or React ref to animate
 */
export const scaleIn = (element: HTMLElement | React.RefObject<HTMLElement>) => {
  const targetElement = element instanceof HTMLElement ? element : element.current;
  
  if (!targetElement) return;
  
  animate(
    targetElement,
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
 * @param element The DOM element or React ref to animate
 */
export const fadeIn = (element: HTMLElement | React.RefObject<HTMLElement>) => {
  const targetElement = element instanceof HTMLElement ? element : element.current;
  
  if (!targetElement) return;
  
  animate(
    targetElement,
    { opacity: [0, 1] },
    {
      duration: 0.5,
      easing: [0.22, 0.03, 0.26, 1]
    }
  );
};

// Note: La fonction animateNumber a été supprimée car jugée perturbante pour les utilisateurs
