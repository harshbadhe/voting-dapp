import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className }) => {
    return (
        <div className={twMerge("glass rounded-xl p-6 hover:shadow-2xl transition-all duration-300", className)}>
            {children}
        </div>
    );
};

export default Card;
