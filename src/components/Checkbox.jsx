import React from 'react'

export default function Checkbox(
    { service, descDesktop, descMobile,
        amount, signUp, serviceDescEnd,
        serviceDescStart, change, name, checked, mobile }) {

    return (
        <label className='checkbox grid'
            aria-label={usefulAria()}
        >
            <input
                onClick={(e) => change(e)}
                name={name}
                checked={checked}
                readOnly
                className='checkbox-input'
                type="checkbox" />
            <div className='checkbox-bg'></div>
            {service === 'Profile'
                ? <div className='checkbox-service fw-b clr-mb'>{serviceDescStart}<span>{serviceDescEnd}</span> {service}</div>
                : <div className='checkbox-service fw-b clr-mb'>{service}</div>}
            {service === 'Online service'
                ? mobile
                    ? <div className='checkbox-description clr-cg'>{descDesktop}</div>
                    : <div className='checkbox-description clr-cg'>{descMobile.charAt(0).toUpperCase() + descMobile.substring(1)}</div>
                : <div className='checkbox-description clr-cg'>{descDesktop} <span>{descMobile}</span></div>}
            <div
                className='checkbox-cost fw-m clr-prb'
            >
                {`+$${amount}`}<span aria-hidden>{`${signUp.planLength === 'yearly' ? 'yr' : 'mo'}`}</span></div>
        </label>
    )

    function usefulAria() {
        switch (service) {
            case 'Online service':
                return ` Online service access to multiplayer games ${signUp.planLength === 'yearly' ? 'ten dollars per year' : 'one dollar per month'}`
            case 'Larger storage':
                return `larger storage extra one terra byte of cloud save ${signUp.planLength === 'yearly' ? 'twenty dollars per year' : 'two dollars per month'}`
            case 'Profile':
                return `Customizable profile custom theme on your profile ${signUp.planLength === 'yearly' ? 'twenty dollars per year' : 'two dollars per month'}`
            default:
                undefined
        }
    }
}

