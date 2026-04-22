import type { Variants } from "framer-motion";

export const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
};

export const flipUp: Variants = {
  hidden: { opacity: 0, rotateX: 8, y: 12 },
  visible: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.5, ease } },
};

export const stagger = (delay = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

export const staggerSlow = stagger(0.12);
export const staggerFast = stagger(0.08);
