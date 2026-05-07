import React from "react";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center gap-2 font-bold tracking-wider uppercase text-xs transition-all duration-300 rounded-full";

  const variants = {
    primary:
      "px-7 py-3 bg-gradient-to-r from-[#c9a84c] to-[#f0d080] text-[#0a1628] hover:shadow-lg hover:shadow-[#c9a84c]/30 hover:-translate-y-0.5",
    outline:
      "px-7 py-3 border-2 border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0a1628]",
    ghost:
      "px-7 py-3 text-white/70 hover:text-white border border-white/20 hover:border-white/50",
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
