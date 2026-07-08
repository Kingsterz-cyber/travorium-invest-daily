// Animation variants for Framer Motion
export const animations = {
  // Header animations
  headerSlide: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" as const },
  },

  // Hero section animations
  heroFadeUp: {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, delay: 0.2, ease: "easeOut" as const },
  },

  // Logo pulse animation
  logoPulse: {
    initial: { scale: 0.9 },
    animate: { scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" as const },
  },

  // Scroll fade up animation
  scrollFadeUp: {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    transition: { duration: 0.7 },
    viewport: { once: true, amount: 0.2 },
  },

  // Section title animation (fade from left)
  sectionTitleFadeLeft: {
    initial: { x: -20, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: { duration: 0.6 },
    viewport: { once: true, amount: 0.2 },
  },

  // Staggered card animation for How It Works
  cardStagger: {
    initial: { y: 30, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    transition: { duration: 0.5 },
    viewport: { once: true, amount: 0.2 },
  },

  // Package cards stagger
  packageCardStagger: {
    initial: { scale: 0.95, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 },
    viewport: { once: true, amount: 0.2 },
  },

  // Testimonial slide animations
  testimonialSlideLeft: {
    initial: { x: -40, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: { duration: 0.6 },
    viewport: { once: true, amount: 0.2 },
  },

  testimonialSlideRight: {
    initial: { x: 40, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: { duration: 0.6 },
    viewport: { once: true, amount: 0.2 },
  },

  // Button hover effect
  buttonHover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },

  buttonTap: {
    scale: 0.97,
  },

  // Card hover effect (lift)
  cardHover: {
    y: -8,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },

  // Payment card animations
  paymentCardSlideLeft: {
    initial: { x: -40, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.6, delay: 0 },
  },

  paymentCardSlideRight: {
    initial: { x: 40, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.6, delay: 0.3 },
  },

  // Success bounce animation
  successBounce: {
    initial: { scale: 0 },
    animate: [{ scale: 1.2 }, { scale: 1 }],
    transition: { duration: 0.6, ease: "easeOut" as const },
  },

  // Pulse animation for WhatsApp button
  whatsappPulse: {
    animate: [{ scale: 1 }, { scale: 1.05 }, { scale: 1 }],
    transition: { duration: 3, repeat: Infinity, repeatDelay: 1 },
  },

  // Fade in animation
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 },
  },

  // Count animation (for stats)
  countUp: {
    transition: { duration: 1.5 },
  },

  // Form field stagger
  formFieldSlide: {
    initial: { x: 40, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.5 },
  },

  // Upload area pulse
  uploadPulse: {
    animate: [
      { borderColor: "rgb(212, 175, 55)" },
      { borderColor: "rgb(200, 200, 200)" },
    ],
    transition: { duration: 2, repeat: Infinity },
  },

  // Loading spinner
  loadingSpinner: {
    animate: { rotate: 360 },
    transition: { duration: 1, repeat: Infinity, ease: "linear" as const },
  },

  // Flash animation for copy button
  flashSuccess: {
    initial: { backgroundColor: "rgb(255, 255, 255)" },
    animate: { backgroundColor: "rgb(10, 126, 60)" },
    transition: { duration: 0.3 },
  },
};

// Stagger container for child animations
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
  viewVisible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Child item variants for stagger
export const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
  viewVisible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

// Floating animation for decorative elements
export const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};
