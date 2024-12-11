import React from "react";
import PropTypes from "prop-types";

export function Button({ children, variant = "default", onClick, ...props }) {
  const baseStyles =
    "px-4 py-2 rounded font-medium transition duration-200 focus:outline-none";
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
    ghost: "bg-transparent text-blue-500 hover:bg-blue-100",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "outline", "ghost"]),
  onClick: PropTypes.func,
};
