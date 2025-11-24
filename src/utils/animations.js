import React from 'react';
import { motion } from 'framer-motion';

// Professional animation variants
export const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.6, -0.05, 0.01, 0.99],
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
};

export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

export const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

export const scaleVariants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20
        }
    }
};

export const slideVariants = (direction = 'left') => ({
    hidden: {
        opacity: 0,
        x: direction === 'left' ? -50 : 50,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20
        }
    }
});

export const fadeInUpVariants = {
    hidden: {
        opacity: 0,
        y: 60
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
};

export const staggerContainerVariants = (staggerDelay = 0.1) => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1
        }
    }
});

// Hover animation presets
export const hoverScale = {
    scale: 1.05,
    transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
    }
};

export const hoverLift = {
    y: -5,
    scale: 1.02,
    transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
    }
};

export const tapScale = {
    scale: 0.95,
    transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
    }
};

// Page transition wrapper component
export const PageTransition = ({ children }) => (
    <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full"
    >
        {children}
    </motion.div>
);

// Floating animation for decorative elements
export const floatAnimation = {
    y: [-10, 10],
    transition: {
        y: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
        }
    }
};

// Pulse animation
export const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
    }
};

// Rotation animation
export const rotateAnimation = {
    rotate: [0, 360],
    transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
    }
};

// Parallax scroll effect hook can be used with motion values
export const parallaxVariants = (offset = 50) => ({
    initial: { y: 0 },
    animate: {
        y: offset,
        transition: {
            type: "spring",
            stiffness: 50,
            damping: 20
        }
    }
});
