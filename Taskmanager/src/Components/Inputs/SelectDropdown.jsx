import React, { useState, useRef, useEffect } from "react";
import { LuChevronDown } from "react-icons/lu";

const SelectDropdown = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel = options.find(
        (opt) => opt.value === value
    )?.label;

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Button */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`
                    w-full flex items-center justify-between
                    text-sm text-slate-800 text-left
                    bg-slate-50 border border-slate-200
                    px-3 py-2.5 rounded-md
                    outline-none
                    transition-all duration-200
                    focus:bg-white focus:border-indigo-500
                    focus:ring-2 focus:ring-indigo-500/20
                `}
            >
                {selectedLabel ? (
                    <span>{selectedLabel}</span>
                ) : (
                    <span className="text-slate-400">
                        {placeholder}
                    </span>
                )}

                <LuChevronDown
                    className={`ml-2 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Menu */}
            {isOpen && (
                <div
                    className="
                        absolute z-20 mt-1 w-full
                        bg-white border border-slate-200
                        rounded-md shadow-lg
                        max-h-60 overflow-y-auto
                    "
                >
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`
                                px-3 py-2 text-sm cursor-pointer
                                transition-colors
                                hover:bg-slate-100
                                ${value === option.value
                                    ? "bg-slate-100 font-medium text-slate-900"
                                    : "text-slate-700"
                                }
                            `}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectDropdown;
