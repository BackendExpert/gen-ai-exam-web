import React from 'react';

const LoginButton = ({
    label = "Click the Button",
    onClick,
    type = "button",
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                w-full 
                bg-gradient-to-r from-indigo-600 to-cyan-500
                hover:scale-[1.02]
                transition-all duration-300
                text-white font-semibold
                py-4 rounded-2xl
                flex items-center justify-center gap-3
                shadow-xl
                ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
            `}
        >
            {label}
        </button>
    );
};

export default LoginButton;