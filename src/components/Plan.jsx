// Components

import RadioInput from './RadioInputs'

export default function Plan({ next, previous, change, signUp }) {

    return (
        <form noValidate className='form-template flex'>
            <div className='form-template-inputs plan flex bg-white clr-mb'>
                <h3 className='fw-b fs-800 form-template-title'>Select your plan</h3>
                <p className='clr-cg fw-m form-template-description'>You have the option of monthly or yearly billing.</p>
                <div className='flex plan-radioGroup' role='radiogroup' aria-label='choose plan level'>
                    {<RadioInput
                        value='arcade'
                        change={change}
                        signUp={signUp}
                        amount={signUp.planLength === 'yearly' ? '90' : '9'}
                    />}
                    {<RadioInput
                        value='advanced'
                        change={change}
                        signUp={signUp}
                        amount={signUp.planLength === 'yearly' ? '120' : '12'}
                    />}
                    {<RadioInput
                        value='pro'
                        change={change}
                        signUp={signUp}
                        amount={signUp.planLength === 'yearly' ? '150' : '15'}
                    />}
                </div>
                <fieldset className='plan-fieldset flex bg-al' aria-label='Choose a monthly or yearly plan'>
                    <div role='radiogroup' className='plan-fieldset-radioGroup'>
                        <label htmlFor="monthly"
                            className={signUp.planLength === 'monthly' ? 'fw-b' : 'fw-m clr-cg'}
                        >Monthly</label>
                        <div className='plan-fieldset-radioGroup-sliderContainer'>
                            <input type="radio"
                                id='monthly'
                                name='planLength'
                                onChange={(e) => change(e)}
                                value='monthly'
                                aria-label={`monthly plan ${signUp.planLevel} ${planPrice()} dollars per month`}
                                checked={signUp.planLength === 'monthly' ? true : false}
                            />
                            <input type="radio"
                                id='yearly'
                                name='planLength'
                                onChange={(e) => change(e)}
                                value='yearly'
                                data-yearly
                                checked={signUp.planLength === 'yearly' ? true : false}
                                aria-label={`yearly plan ${signUp.planLevel} ${planPrice()} dollars per year`}
                            />
                            <span className='fill'></span>
                        </div>
                        <label htmlFor="yearly"
                            className={signUp.planLength === 'monthly' ? 'fw-m clr-cg' : 'fw-b'}
                        >Yearly</label>
                    </div>
                </fieldset>
            </div>
            <div className='form-template-btns flex'>
                <div className='form-template-btns-btn'>
                    <button className='nextBtn' onClick={next}>Next Step</button>
                    <button className='prevBtn' onClick={previous}>Go Back</button>
                </div>
            </div>
        </form >
    )

    function planPrice() {
        switch (signUp.planLevel) {
            case 'arcade':
                return signUp.planLength === 'yearly' ? '90' : '9'
            case 'advanced':
                return signUp.planLength === 'yearly' ? '120' : '12'
            case 'pro':
                return signUp.planLength === 'yearly' ? '150' : '15'
            default:
                return undefined
        }
    }

}
