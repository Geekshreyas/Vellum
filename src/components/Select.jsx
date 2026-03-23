import React, { useId } from 'react';

const Select = React.forwardRef(function Select({
    options,
    label,
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
            
            <div className="relative w-full">
                <select
                    {...props}
                    id={id}
                    ref={ref}
                    className={`
                        w-full px-4 py-2.5 pr-10 text-sm text-gray-900 bg-white
                        border border-gray-300 rounded-lg shadow-sm appearance-none
                        transition-all duration-200 ease-in-out
                        hover:border-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                        disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed
                        ${className}
                    `}
                >
                    {options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                
                
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-500">
                    <svg 
                        className="h-4 w-4 transition-transform duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M19 9l-7 7-7-7" 
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
});

export default Select;