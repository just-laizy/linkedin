import React from "react";
import PropTypes from "prop-types";

/* Main Card Component */
export function Card({ children }) {
  return (
    <div className="max-w-sm mx-auto bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

/* Card Header - expects title and subtitle explicitly */
export function CardHeader({ title, subtitle }) {
  return (
    <div className="p-4 border-b">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
}

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

/* Card Content */
export function CardContent({ children }) {
  return <div className="p-4 text-sm text-gray-700">{children}</div>;
}

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
};

/* Card Footer */
export function CardFooter({ buttonText, onButtonClick }) {
  return (
    <div className="p-4 border-t flex justify-end">
      <button
        onClick={onButtonClick}
        className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition duration-200"
      >
        {buttonText}
      </button>
    </div>
  );
}

CardFooter.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
