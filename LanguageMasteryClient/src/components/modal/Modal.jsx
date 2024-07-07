import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1030] px-3">
      <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
      <div
        style={{ width: "1000px", maxWidth: "100%" }}
        className="bg-slate-100 dark:bg-slate-800 rounded-lg py-8 px-4 sm:px-8 sm:p-8 z-[1040] relative max-h-[calc(100vh-3rem)] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="btn btn-outline btn-circle absolute right-4 top-4 btn-sm"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
