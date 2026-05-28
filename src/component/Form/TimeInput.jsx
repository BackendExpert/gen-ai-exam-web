import React from 'react';

const TimeInput = ({
    label,
    name,
    value,
    onChange,
    required = false,
    minTime,
    maxTime
}) => {
    return (
        <div className="mb-5">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-xs font-semibold mb-2 text-gray-700"
                >
                    {label}
                </label>
            )}

            <input
                type="time"
                min={minTime}
                max={maxTime}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required={required}
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

export default TimeInput;