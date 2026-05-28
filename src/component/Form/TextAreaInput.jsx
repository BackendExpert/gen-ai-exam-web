import React from 'react';

const TextAreaInput = ({
    label,
    name,
    rows = 4,
    value,
    onChange,
    placeholder = '',
    required = false,
}) => {
    return (
        <div className="mb-5">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-xs font-semibold mb-2"
                >
                    {label}
                </label>
            )}
            <textarea
                id={name}
                name={name}
                rows={rows}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="
                        w-full px-4 py-3
                        rounded
                        border border-gray-100
                        bg-white/90 backdrop-blur-sm
                        text-sm text-gray-800
                        placeholder:text-gray-400
                        shadow-sm

                        focus:outline-none
                        focus:border-gray-300
                        focus:ring-1 focus:ring-gray-200/60

                        hover:border-gray-300
                        hover:shadow-md

                        transition-all duration-300
                        resize-none
                    "
            />
        </div>
    );
};

export default TextAreaInput;
