import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, children, title }) => {

    // ✅ Hooks MUST be unconditional
    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    // ✅ Conditional rendering AFTER hooks
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative bg-white rounded-lg shadow-lg">

                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="text-lg font-semibold text-slate-800">
                            {title}
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex items-center justify-center w-5 h-5 text-gray-500 hover:text-gray-800 rounded-lg"
                        >
                            <svg
                                aria-hidden="true"
                                fill="none"
                                viewBox="0 0 14 14"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-4 space-y-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
