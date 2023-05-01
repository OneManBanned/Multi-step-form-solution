import { useState } from 'react'

export default function FormInput(props) {
    const [focused, setFocused] = useState(false)
    const { label, type, onChange, id, placeholder, errorMessage, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true)
    }

    return (
        <div className='personalInfo-inputContainer'>
            <label htmlFor={label}>{label}</label>
            <input {...inputProps}
                onChange={onChange}
                placeholder={placeholder}
                aria-describedby={id}
                id={label}
                onBlur={handleFocus}
                focused={focused.toString()}
                type={type}
                required
            />
            <div id={id} className="clr-rd">{errorMessage}</div>

        </div>
    )
}