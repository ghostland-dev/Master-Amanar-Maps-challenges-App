
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
