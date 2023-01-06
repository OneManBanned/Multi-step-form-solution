import React from 'react'

import arcade from '../../public/assets/images/icon-arcade.svg'
import advanced from '../../public/assets/images/icon-advanced.svg'
import pro from '../../public/assets/images/icon-pro.svg'

export default function RadioInput({ value, change, signUp, amount }) {

    // Insures correct radio button is checked
    function handleRadioBtns(string, name) {
        return string === name ? true : false
    }

    const labelText = signUp.planYearly ? `${amount} dollars per year` : `${amount} dollars per month`

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
                readOnly
            />
            <label
                className={classSelector(value)}
                htmlFor={value}>
                <p className='clr-mb fw-b fs-700'>{value.charAt(0).toUpperCase() + value.substring(1)}</p>
                <p
                    aria-label={labelText}
                    className='clr-cg fs-500'>{`$${amount}`}{signUp.planYearly ? `/yr` : '/mo'}</p>
                {signUp.planYearly && <p className='clr-mb fw-m fs-400'>2 months free</p>}
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
