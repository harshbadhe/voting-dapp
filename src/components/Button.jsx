import React from 'react';
import { Loader2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const Button = ({
    className,
    variant = 'primary',
    isLoading,
    children,
    disabled,
    ...props
}) => {
    const baseStyles = "px-6 py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95";

    const variants = {
        primary: "bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/25",
        secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200",
        danger: "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200",
    };

    return (
        <button
            className={twMerge(baseStyles, variants[variant], className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {children}
        </button>
    );
};

export default Button;
