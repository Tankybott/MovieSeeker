import React from "react";

export const Modal: React.FC<{
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ onClose, children, className = "" }) => {
  const handleBackdropClick = () => {
    if (onClose) onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${className}`}
      onClick={handleBackdropClick}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className="relative z-10 max-h-[90vh] overflow-y-auto p-6 py-14 border border-primary bg-black rounded-2xl text-white min-w-[300px] max-w-[98vw] lg:max-w-[80vw]"
        onClick={handleModalClick}
      >
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute p-3 top-2  right-3 text-white text-lg font-bold hover:text-primary transition-colors"
            aria-label="Close"
          >
            X
          </button>
        )}

        {children}
      </div>
    </div>
  );
};
