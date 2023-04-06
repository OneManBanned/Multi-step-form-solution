import { useState, useEffect } from 'react'

export default function Confirmation({ next, previous, click, signUp }) {

    const [displayAddons, setDisplayAddons] = useState(false)

    // If add-ons are selected display add on div - else don't display
    useEffect(() => {
        if (signUp.largerStorage || signUp.onlineService || signUp.customizableProfile) {
            setDisplayAddons(true)
        } else {
            setDisplayAddons(false)
        }
    }, [signUp.largerStorage, signUp.onlineService, signUp.customizableProfile])

    return (
        <form className='form-template flex'>
            <div className='form-template-inputs confirmation flex bg-white clr-mb'>
                <h3 className='fw-b fs-800 form-template-title'>Finishing up</h3>
                <p className='clr-cg fw-m form-template-description'>Double-check everything looks OK before confirming</p>
                <div className='confirmation-services'>
                    <div className='confirmation-services-plan grid'>
                        <p className='confirmation-services-plan-type fw-b clr-mb'>{signUp.planLevel.charAt(0).toUpperCase() + signUp.planLevel.substring(1)} <span>({signUp.planLength === 'yearly' ? 'Yearly' : 'Monthly'})</span></p>
                        <p aria-hidden className='confirmation-services-plan-price fw-b clr-mb fs-700'>
                            ${planPrice()}/{signUp.planLength === 'yearly' ? 'yr' : 'mo'}</p>
                        <span className='sr-only'>{planPrice()} dollars per {signUp.planLength === 'yearly' ? 'year' : 'month'}</span>
                        <button
                            onClick={(e) => { console.log(e), click(e), e.target.airalabelledby = 'total' }}
                            onBlur={(e) => {
                                signUp.planLength === 'monthly'
                                    ? e.target.ariaLabel = 'Change to yearly plan'
                                    : e.target.ariaLabel = 'Change to monthly plan'
                            }}

                            name='planLength'
                            aria-describedby='total'
                            className='fw-r clr-cg'>Change<span className='sr-only'>to {signUp.planLevel === 'monthly' ? 'yearly' : 'monthly'} plan</span></button>
                    </div>
                    {displayAddons &&
                        <div className='confirmation-services-addOns'>
                            {signUp.onlineService && <div aria-hidden className='flex fw-m clr-cg'><p>Online service</p><p className='clr-mb fw-m'>+{signUp.planLength === 'yearly' ? '10' : '1'}/{signUp.planLength === 'yearly' ? 'yr' : 'mo'}</p></div>}
                            {signUp.onlineService && <div className='sr-only'><p>Online service</p><p>{signUp.planLength === 'yearly' ? '10 dollars' : '1 dollar'} {signUp.planLength === 'yearly' ? 'per year' : 'per month'}</p></div>}
                            {signUp.largerStorage && <div aria-hidden className='flex fw-m clr-cg'><p>Larger storage</p><p className='clr-mb fw-m'>+{signUp.planLength === 'yearly' ? '20' : '2'}/{signUp.planLength === 'yearly' ? 'yr' : 'mo'}</p></div>}
                            {signUp.largerStorage && <div className='sr-only'><p>larger Storage</p><p>{signUp.planLength === 'yearly' ? '20 dollars' : '2 dollars'} {signUp.planLength === 'yearly' ? 'per year' : 'per month'}</p></div>}
                            {signUp.customizableProfile && <div aria-hidden className='flex fw-m clr-cg'><p>Custom<span>izable</span> profile</p><p className='clr-mb fw-m'>+{signUp.planLength === 'yearly' ? '20' : '2'}/{signUp.planLength === 'yearly' ? 'yr' : 'mo'}</p></div>}
                            {signUp.customizableProfile && <div className='sr-only'><p>customizable Profile</p><p>{signUp.planLength === 'yearly' ? '20 dollars' : '2 dollars'} {signUp.planLength === 'yearly' ? 'per year' : 'per month'}</p></div>}
                        </div>
                    }
                </div>
                <div className='confirmation-total' tabIndex='0'>
                    <div aria-hidden className='flex fw-m clr-cg'><p>Total <span>({signUp.planLength === 'yearly' ? 'per year' : 'per month'})</span></p><p className='clr-prb fw-b fs-750'>${tally()}/{signUp.planLength === 'yearly' ? 'yr' : 'mo'}</p></div>
                    <div className='sr-only'><p>Total <span>({signUp.planLength === 'yearly' ? 'per year' : 'per month'})</span></p><p>{tally()} dollars</p></div>
                </div>
            </div>
            <div className='form-template-btns flex'>
                <div className='form-template-btns-btn'>
                    <button className='nextBtn-confirm' onClick={next}>Confirm</button>
                    <button className='prevBtn' onClick={previous}>Go Back</button>
                </div>
            </div>
        </form>
    )

    function planPrice() {
        switch (signUp.planLevel) {
            case 'arcade':
                return signUp.planLength === 'monthly' ? '9' : '90'
            case 'advanced':
                return signUp.planLength === 'monthly' ? '12' : '120'
            case 'pro':
                return signUp.planLength === 'monthly' ? '15' : '150'
            default:
                return undefined
        }
    }

    // Sum up the total cost of plan plus addons
    function tally() {
        let value = planPrice()
        let addOns = 0
        if (signUp.onlineService) {
            signUp.planLength === 'yearly' ? addOns += 10 : addOns += 1
        }
        if (signUp.largerStorage) {
            signUp.planLength === 'yearly' ? addOns += 20 : addOns += 2
        }
        if (signUp.customizableProfile) {
            signUp.planLength === 'yearly' ? addOns += 20 : addOns += 2
        }
        let total = addOns + parseInt(value)
        let totalStr = total.toString()
        return totalStr
    }

}

