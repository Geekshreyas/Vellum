import React from 'react';

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600", 
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`
                inline-flex items-center justify-center
                px-4 py-2.5 text-sm font-medium
                rounded-lg shadow-sm
                transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2
                active:scale-[0.98]
                disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
                hover:shadow hover:brightness-110
                ${bgColor} ${textColor} ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}