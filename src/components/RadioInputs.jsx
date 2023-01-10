import React from 'react'

export default function RadioInput({ value, change, signUp, amount }) {

    // Insures correct radio button is checked
    function handleRadioBtns(string, name) {
        return string === name ? true : false
    }

    const labelText = signUp.planLength === 'yearly' ? `${amount} dollars per year. 2 months free` : `${amount} dollars per month`

    return (
        <div className='radio'>
            <input
                className="radio-input"
                onChange={(e) => change(e)}
                type="radio"
                name='planLevel'
                value={value}
                id={value}
                checked={handleRadioBtns(value, signUp.planLevel)}
                aria-label={`${value} ${labelText}`}
            />
            <label
                className={classSelector(value)}
                htmlFor={value}
            >
                <span className='clr-mb fw-b fs-700'>{value.charAt(0).toUpperCase() + value.substring(1)}</span>
                <span className='clr-cg fs-500'>{`$${amount}`}{signUp.planLength === 'yearly' ? `/yr` : '/mo'}</span>
                {signUp.planLength === 'yearly' && <span className='clr-mb fw-m fs-400'>2 months free</span>}
            </label>
        </div >
    )
}

function classSelector(str) {
    switch (str) {
        case 'arcade':
            return 'radio-label arcade'
        case 'advanced':
            return 'radio-label advanced'
        case 'pro':
            return 'radio-label pro'
        default:
            break;
    }
}
