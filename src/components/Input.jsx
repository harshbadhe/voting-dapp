import React from 'react';
import { twMerge } from 'tailwind-merge';

const Input = ({ className, label, ...props }) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm font-medium text-slate-700 ml-1">
                    {label}
                </label>
            )}
            <input
                className={twMerge(
                    "bg-white border border-slate-200 rounded-lg px-4 py-2.5 outline-none transition-all shadow-sm",
                    "focus:border-primary focus:ring-1 focus:ring-primary/50",
                    "placeholder:text-gray-400 text-slate-900",
                    className
                )}
                {...props}
            />
        </div>
    );
};

export default Input;
