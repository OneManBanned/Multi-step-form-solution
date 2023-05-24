import { useState, useEffect } from 'react'

export default function FormInput(props) {
    const [err, setErr] = useState('')
    const { label, type, onChange, id, valid, placeholder, errMsg, ...inputProps } = props;


    return (
        <div className='personalInfo-inputContainer'>
            <label htmlFor={label}>{label}</label>
            <input {...inputProps}
                onChange={onChange} 
                placeholder={placeholder}
                aria-describedby={id}
                id={label}
                
                onBlur={handleErr}
                type={type}
                required
                className={err ? 'invalid' : 'valid'}
            />
            <span id={id} className={err ? 'invalid' : 'valid'}>{err}</span>
        </div>
    )
}