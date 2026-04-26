import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: "bg-brand-red text-white shadow-[0_5px_0_#C0395B] hover:shadow-[0_2px_0_#C0395B] hover:translate-y-[3px]",
  secondary: "bg-brand-blue text-white shadow-[0_5px_0_#0D6F91] hover:shadow-[0_2px_0_#0D6F91] hover:translate-y-[3px]",
  success: "bg-brand-green text-white shadow-[0_5px_0_#04AC80] hover:shadow-[0_2px_0_#04AC80] hover:translate-y-[3px]",
  warning: "bg-brand-yellow text-brand-dark shadow-[0_5px_0_#E6B048] hover:shadow-[0_2px_0_#E6B048] hover:translate-y-[3px]",
  purple: "bg-brand-purple text-white shadow-[0_5px_0_#753AB3] hover:shadow-[0_2px_0_#753AB3] hover:translate-y-[3px]",
};

export const AnimatedButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  fullWidth = false
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={!disabled ? onClick : undefined}
      className={`
        relative px-6 py-3 rounded-2xl font-heading text-xl md:text-2xl 
        transition-all duration-100 ease-in-out
        ${variants[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed transform-none shadow-none translate-y-[5px]' : ''}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};
