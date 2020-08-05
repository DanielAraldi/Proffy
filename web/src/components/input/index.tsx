import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}

// O ...rest passa todos os atributos do input para o próprio input
const Input: React.FC<inputProps> = ({ label, name, ...rest }) => {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest} />
        </div>
    )
}

export default Input;