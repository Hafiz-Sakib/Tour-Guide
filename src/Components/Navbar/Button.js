// src/Components/Button.js
import React from "react";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const base = `
    inline-flex items-center justify-center gap-2
    font-black tracking-widest uppercase text-xs
    transition-all duration-300 rounded-full
    btn-glow active:scale-95
  `;

  const variants = {
    primary: `
  px-8 py-3.5
  bg-gradient-to-r from-[#c9a84c] via-[#e8c96a] to-[#f4d88a]
  text-[#0d1f35] font-black
  hover:shadow-xl hover:shadow-[#c9a84c]/40
  hover:-translate-y-0.5 hover:scale-105
  active:scale-95
`,
    outline: `
      px-8 py-3.5
      border-2 border-[#c9a84c] text-[#c9a84c]
      hover:bg-[#c9a84c] hover:text-[#0d1f35]
      hover:shadow-md hover:shadow-[#c9a84c]/20
      hover:scale-105
    `,
    ghost: `
      px-8 py-3.5
      text-white/70 hover:text-white
      border border-white/20 hover:border-white/50
      hover:bg-white/8
    `,
    dark: `
      px-8 py-3.5
      bg-[#0d1f35] text-white
      hover:bg-[#0b6b62]
      hover:shadow-lg hover:shadow-[#0b6b62]/20
      hover:-translate-y-0.5 hover:scale-105
    `,
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
