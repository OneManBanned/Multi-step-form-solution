import { useState, useEffect } from 'react'
import Checkbox from './Checkbox'

export default function AddOns({ next, previous, signUp, change, stage }) {

    const [mobile, setMobile] = useState(false)


    useEffect(() => {
        let query = window.matchMedia('(min-width: 475px)')
        query.matches ? setMobile(true) : setMobile(false)
    }, [stage])

    handler()

    return (
        <form className='form-template flex'>
            <div className='form-template-inputs addOns flex bg-white clr-mb'>
                <h1 className='fw-b fs-800 form-template-title'>Pick add-ons</h1>
                <p className='clr-cg fw-m form-template-description'>Add-ons help enhance your gaming experience</p>
                <div className='flex addOns-checkboxes'>
                    {<Checkbox
                        name='onlineService'
                        change={change}
                        service='Online service'
                        descMobile='multiplayer'
                        descDesktop='Access to multiplayer games'
                        amount={signUp.planYearly ? '10' : '1'}
                        signUp={signUp}
                        checked={signUp.onlineService}
                        mobile={mobile}
                    />}
                    {<Checkbox
                        name='largerStorage'
                        change={change}
                        service='Larger storage'
                        descDesktop='Extra 1TB'
                        descMobile='of cloud save'
                        amount={signUp.planYearly ? '20' : '2'}
                        signUp={signUp}
                        checked={signUp.largerStorage}
                        mobile={mobile}
                    />}
                    {<Checkbox
                        name='customizableProfile'
                        change={change}
                        service='Profile'
                        serviceDescEnd='izable'
                        serviceDescStart='Custom'
                        descDesktop='Custom theme'
                        descMobile='on your profile'
                        amount={signUp.planYearly ? '20' : '2'}
                        signUp={signUp}
                        checked={signUp.customizableProfile}
                        mobile={mobile}
                    />}
                </div>

            </div>
            <div className='form-template-btns flex'>
                <div className='form-template-btns-btn'>
                    <button className='prevBtn' onClick={previous}>Go Back</button>
                    <button className='nextBtn' onClick={next}>Next Step</button>
                </div>
            </div>
        </form>
    )

    function handler() {
        window.matchMedia('(min-width: 475px)').addEventListener('change', (e) => {
            e.matches ? setMobile(true) : setMobile(false)
        })
    }
}