import { useState, useEffect } from 'react'

export default function PersonalInfo({ signUp, change, next }) {

    // If valid === true user can continue onto next stage of form
    const [valid, setValid] = useState(false)

    // Messages for validation errors
    const [nameErr, setNameErr] = useState(undefined)
    const [emailErr, setEmailErr] = useState(undefined)
    const [numErr, setNumErr] = useState(undefined)

    // Listen for validtion errors messages 
    // if none and signUp[values] are not empty
    //  set valid === true
    useEffect(() => {
        if (nameErr === undefined
            && emailErr === undefined
            && numErr === undefined
            && signUp.name !== ''
            && signUp.email !== ''
            && signUp.number !== ''
        ) {
            setValid(true)
        } else {
            setValid(false)
        }
    }, [nameErr, emailErr, numErr])

    return (
        <form noValidate onSubmit={(e) => { e.preventDefault(), validate() }} className='form-template personalInfo flex'>
            <div className='form-template-inputs flex bg-white clr-mb'>
                <h1 className='fw-b fs-800 form-template-title'>Personal Info</h1>
                <p className='clr-cg fw-m form-template-description'>Please provide your name, email address, and phone number.</p>
                <label htmlFor="name" className='fs-500 fw-m clr-mb'>Name
                    {nameErr && <span className='err clr-rd'>{nameErr}</span>}</label>
                <input type="text" id='name' name='name'
                    className={nameErr ? 'error' : ''}
                    placeholder='e.g. Stephen King'
                    value={signUp.name}
                    onChange={(e) => { change(e), errMsg(e) }}
                />
                <label htmlFor="email"
                    className='fs-500 fw-m clr-mb'
                >Email Address
                    {emailErr && <span className='err clr-rd'>{emailErr}</span>}
                </label>
                <input type="email" id='email' name='email'
                    className={emailErr ? 'error' : ''}
                    placeholder='e.g. stephenking@lorem.com'
                    value={signUp.email}
                    onChange={(e) => { change(e), errMsg(e) }}
                />
                <label htmlFor="number" className='fs-500 fw-m clr-mb'>Phone Number
                    {numErr && <span className='err clr-rd'>{numErr}</span>}</label>
                <input type="number" id="number" name='number'
                    className={numErr ? 'error' : ''}
                    placeholder='e.g +1 234 567 890'
                    value={signUp.number}
                    onChange={(e) => { change(e), errMsg(e) }}
                />
            </div>
            <div className='form-template-btns flex'>
                <div className='form-template-btns-btn'>
                    <button className='nextBtn' onClick={valid ? next : undefined}>Next Step</button>
                </div>
            </div>
        </form>
    )

    // If user tries to submit before using inputs
    // set validation error message - 'This field is required'
    function validate() {
        if (signUp.name === '') {
            setNameErr('This field is required')
        } if (signUp.email === '') {
            setEmailErr('This field is required')
        } if (signUp.number === '') {
            setNumErr('This field is required')
        }
    }

    // Check for type of validation error and set message state
    function errMsg(e) {
        const { name, value } = e.target
        switch (name) {
            case 'name':
                if (value === '') {
                    setNameErr('This field is required')
                } else if (value.match(/^(?!-)(?!.*-$)[a-zA-Z-]+$/)) {
                    setNameErr('Enter first and last name')
                } else {
                    setNameErr(undefined)
                }
                break;
            case 'email':
                if (value === '') {
                    setEmailErr('This field is required')
                } else if (!value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    setEmailErr('must be a valid email address')
                } else {
                    setEmailErr(undefined)
                }
                break;
            case 'number':
                if (value.length < 10 && value.length > 0) {
                    setNumErr('number should be 10 digits')
                } else if (value === '') {
                    setNumErr('This field is required')
                } else {
                    setNumErr(undefined)
                }
                break;
            default:
                undefined
        }
    }
}