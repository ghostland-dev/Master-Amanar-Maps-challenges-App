
export const fadeIn = (
  element: HTMLElement,
  delay: number = 0,
  duration: number = 300
): void => {
  element.style.opacity = "0";
  element.style.transition = `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`;
  element.style.transform = "translateY(20px)";

  setTimeout(() => {
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
  }, 10);
};

export const slideIn = (
  element: HTMLElement,
  direction: "up" | "down" | "left" | "right" = "up",
  delay: number = 0,
  duration: number = 400
): void => {
  element.style.opacity = "0";
  element.style.transition = `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`;

  switch (direction) {
    case "up":
      element.style.transform = "translateY(30px)";
      break;
    case "down":
      element.style.transform = "translateY(-30px)";
      break;
    case "left":
      element.style.transform = "translateX(30px)";
      break;
    case "right":
      element.style.transform = "translateX(-30px)";
      break;
  }

  setTimeout(() => {
    element.style.opacity = "1";
    element.style.transform = "translate(0)";
  }, 10);
};

export const scaleIn = (
  element: HTMLElement,
  delay: number = 0,
  duration: number = 400
): void => {
  element.style.opacity = "0";
  element.style.transition = `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`;
  element.style.transform = "scale(0.95)";

  setTimeout(() => {
    element.style.opacity = "1";
    element.style.transform = "scale(1)";
  }, 10);
};

export const stagger = (
  elements: NodeListOf<HTMLElement> | HTMLElement[],
  animation: (element: HTMLElement, delay: number, duration: number) => void,
  delayBetween: number = 100,
  duration: number = 300
): void => {
  elements.forEach((el, index) => {
    animation(el, delayBetween * index, duration);
  });
};
