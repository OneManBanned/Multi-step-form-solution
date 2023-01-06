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
                <h1 className='fw-b fs-800 form-template-title'>Finishing up</h1>
                <p className='clr-cg fw-m form-template-description'>Double-check everything looks OK before confirming</p>
                <div className='confirmation-services'>
                    <div className='confirmation-services-plan grid'>
                        <p className='confirmation-services-plan-type fw-b clr-mb'>{signUp.planLevel.charAt(0).toUpperCase() + signUp.planLevel.substring(1)} <span>({signUp.planYearly ? 'Yearly' : 'Monthly'})</span></p>
                        <button
                            onClick={(e) => { click(e) }}
                            name='planYearly'
                            aria-label={signUp.planYearly
                                ? 'change to monthly plan'
                                : 'change to yearly plan'}
                            className='fw-r clr-cg'>Change</button>
                        <p className='confirmation-services-plan-price fw-b clr-mb fs-700'>$
                            {planPrice()}{signUp.planYearly ? '0' : ''}
                            /{signUp.planYearly ? 'yr' : 'mo'}</p>
                    </div>
                    {displayAddons &&
                        <div className='confirmation-services-addOns'>
                            {signUp.onlineService && <div className='flex fw-m clr-cg'><p>Online service</p><p className='clr-mb fw-m'>+{signUp.planYearly ? '10' : '1'}/{signUp.planYearly ? 'yr' : 'mo'}</p></div>}
                            {signUp.largerStorage && <div className='flex fw-m clr-cg'><p>Larger storage</p><p className='clr-mb fw-m'>+{signUp.planYearly ? '20' : '2'}/{signUp.planYearly ? 'yr' : 'mo'}</p></div>}
                            {signUp.customizableProfile && <div className='flex fw-m clr-cg'><p>Custom<span>izable</span> profile</p><p className='clr-mb fw-m'>+{signUp.planYearly ? '20' : '2'}/{signUp.planYearly ? 'yr' : 'mo'}</p></div>}
                        </div>
                    }
                </div>
                <div className='confirmation-total'>
                    <div className='flex fw-m clr-cg'><p>Total <span>({signUp.planYearly ? 'per year' : 'per month'})</span></p><p className='clr-prb fw-b fs-750'>${tally()}{signUp.planYearly ? '0' : ''}/{signUp.planYearly ? 'yr' : 'mo'}</p></div>
                </div>
            </div>
            <div className='form-template-btns flex'>
                <div className='form-template-btns-btn'>
                    <button className='prevBtn' onClick={previous}>Go Back</button>
                    <button className='nextBtn-confirm' onClick={next}>Confirm</button>
                </div>
            </div>
        </form>
    )

    // Display correct price for plan level
    // 0 is added dynmically in the element -- planYearly ? '0' : ''
    function planPrice() {
        switch (signUp.planLevel) {
            case 'arcade':
                return '9'
            case 'advanced':
                return '12'
            case 'pro':
                return '15'
            default:
                return undefined
        }
    }

    // Sum up the total cost of plan plus addons
    function tally() {
        let value = planPrice()
        let addOns = 0
        if (signUp.onlineService) {
            addOns += 1
        }
        if (signUp.largerStorage) {
            addOns += 2
        }
        if (signUp.customizableProfile) {
            addOns += 2
        }
        let total = addOns + parseInt(value)
        let totalStr = total.toString()
        return totalStr
    }
}