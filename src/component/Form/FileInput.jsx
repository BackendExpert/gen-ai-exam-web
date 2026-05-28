import React from 'react';

const FileInput = ({
    label,
    name,
    onChange,
    required = false,
    accept,
    multiple = false
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
                type="file"
                name={name}
                id={name}
                onChange={onChange}
                required={required}
                accept={accept}
                multiple={multiple}
                className="
                    w-full
                    rounded
                    border border-gray-100
                    bg-white/90 backdrop-blur-sm
                    text-sm text-gray-700
                    shadow-sm

                    file:mr-4
                    file:px-4
                    file:py-3
                    file:border-0
                    file:rounded
                    file:bg-gray-100
                    file:text-gray-700
                    file:text-sm
                    file:font-medium
                    hover:file:bg-gray-200

                    focus:outline-none
                    focus:border-gray-300
                    focus:ring-1 focus:ring-gray-200/60

                    hover:border-gray-300
                    hover:shadow-md

                    transition-all duration-300
                "
            />
        </div>
    );
};

export default FileInput;