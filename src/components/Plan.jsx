import { useEffect } from 'react'

// Components

import RadioInput from './RadioInputs'

export default function Plan({ next, previous, change, signUp }) {

    return (
        <form noValidate className='form-template flex'>
            <div className='form-template-inputs plan flex bg-white clr-mb'>
                <h1 className='fw-b fs-800 form-template-title'>Select your plan</h1>
                <p className='clr-cg fw-m form-template-description'>You have the option of monthly or yearly billing.</p>
                <div className='flex plan-radioGroup' role='radiogroup'>
                    {<RadioInput
                        value='arcade'
                        change={change}
                        signUp={signUp}
                        amount={signUp.planYearly ? '90' : '9'}
                    />}
                    {<RadioInput
                        value='advanced'
                        change={change}
                        signUp={signUp}
                        amount={signUp.planYearly ? '120' : '12'}
                    />}
                    {<RadioInput
                        value='pro'
                        change={change}
                        signUp={signUp}
                        amount={signUp.planYearly ? '150' : '15'}
                    />}
                </div>
                <div className='plan-slider flex bg-al'>
                    <div className='sliderContainer '>
                        <label
                            aria-label={signUp.planYearly ? 'Yearly plan' : 'Monthly plan'}
                            className='toggle' htmlFor="timePeriod">
                            <span className={!signUp.planYearly ? 'fw-b' : 'fw-m clr-cg'}>Monthly</span>
                            <input
                                onClick={(e) => change(e)}
                                className='toggle-input'
                                type="checkbox"
                                name='planYearly'
                                id='timePeriod'
                                checked={signUp.planYearly}
                                readOnly
                            />
                            <div className="toggle-fill"></div>
                            <span className={!signUp.planYearly ? 'fw-m clr-cg' : 'fw-b'}>Yearly</span></label>
                    </div>


                </div>
            </div>
            <div className='form-template-btns flex'>
                <div className='form-template-btns-btn'>
                    <button className='prevBtn' onClick={previous}>Go Back</button>
                    <button className='nextBtn' onClick={next}>Next Step</button>
                </div>
            </div>
        </form >
    )
}
