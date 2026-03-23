import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();
    
    return (
        <div className="w-full flex flex-col items-start">
            {label && (
                <label 
                    htmlFor={id}
                    className="mb-1.5 text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <input 
                type={type} 
                className={`
                    w-full px-4 py-2.5 text-sm text-gray-900 bg-white
                    border border-gray-300 rounded-lg shadow-sm
                    transition-all duration-200 ease-in-out
                    placeholder:text-gray-400
                    hover:border-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                    disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed disabled:shadow-none
                    ${className}
                `}
                ref={ref}
                id={id}
                {...props}
            />
        </div>
    );
});

export default Input;