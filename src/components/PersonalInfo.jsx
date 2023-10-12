import { useRef, useEffect, useState } from 'react'

export default function PersonalInfo({ signUp, change, next }) {

    // Refs used to manage focus 
    const usernameRef = useRef(null)
    const emailRef = useRef(null)
    const numberRef = useRef(null)

    const [usernameErr, setUsernameErr] = useState(['This field is required', false, usernameRef])
    const [emailErr, setEmailErr] = useState(['This field is required', false, emailRef])
    const [numberErr, setNumberErr] = useState(['This field is required', false, numberRef])

    const inputStateArr = [usernameErr, emailErr, numberErr]

    // On form submit inputArr is filtered for invalid inputs and focus given
    // to the input in invalidInputArr[0] - see validateForm function
    let invalidInputArr = []

    useEffect(() => {
        usernameRef.current.focus()
    }, [])

    function validateForm(e) {
        e.preventDefault();
        if (e.target.checkValidity()) next(e)
        for (let i = 0; i < 3; i++) {
            checkValidation(e.target[i])
        }
        // filter input states for invalid inputs
        invalidInputArr = inputStateArr.filter(input => input[1])
        // if any invalid inputs focus and first in array
        if (invalidInputArr.length > 0) invalidInputArr[0][2].current.focus()
    }

    function validateInput(e) {
        checkValidation(e.target)
    }

    // Clear error warning when user starts typing
    function clearErr(e) {
        if (e.target.classList.contains('invalid')) validInput(e.target.name, false)
    }

    // Checks if input is valid. Called for on blur of inputs and form submit
    function checkValidation(input) {
        if (!input.validity.valid) {
            validInput(input.name, true, errMessage(input))
        } else {
            validInput(input.name, false, errMessage(input))
        }
    }

    function errMessage(input) {
        if (input.validity.tooShort) {
            return 'Must be atleast 9 digits'
        }
        if (input.validity.typeMismatch) {
            return 'Must be valid email'
        }
        if (input.validity.patternMismatch) {
            return 'Numbers only'
        }
        return 'This field is required'
    }

    // If input is invalid, find and update input state
    function validInput(inputName, boolean, errMsg) {
        switch (inputName) {
            case 'username':
                return setUsernameErr(prevErr => [errMsg, boolean, prevErr[2]])
                break;
            case 'email':
                return setEmailErr(prevErr => [errMsg, boolean, prevErr[2]])
                break;
            case 'number':
                return setNumberErr(prevErr => [errMsg, boolean, prevErr[2]])
                break;
            default:
                null
        }
    }

    return (
        <form className='form-template personalInfo flex' noValidate
            onSubmit={(e) => validateForm(e)} >
            <div className='form-template-inputs  flex bg-white clr-mb'>
                <h3 className='fw-b fs-800 form-template-title'>Personal Info</h3>
                <p className='clr-cg fw-m form-template-description'>Please provide your name, email address, and phone number.</p>
                <div className='personalInfo-inputContainer'>
                    <label htmlFor='username'>Name</label>
                    <input
                        name='username'
                        type='text'
                        id='username'
                        ref={usernameRef}
                        placeholder='e.g. Stephen King'
                        value={signUp.username}
                        onChange={(e) => { change(e); clearErr(e) }}
                        onBlur={validateInput}
                        className={usernameErr[1] ? 'invalid' : null}
                        required
                    />
                    <span className={usernameErr[1] ? 'invalid' : null}>
                        {usernameErr[1] ? usernameErr[0] : null}</span>
                </div>
                <div className='personalInfo-inputContainer'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        name='email'
                        type='email'
                        id='email'
                        ref={emailRef}
                        placeholder='e.g. stephenking@lorem.com'
                        value={signUp.email}
                        onChange={(e) => { change(e); clearErr(e) }}
                        onBlur={validateInput}
                        className={emailErr[1] ? 'invalid' : null}
                        required
                    />
                    <span className={emailErr[1] ? 'invalid' : null}
                    >{emailErr[1] ? emailErr[0] : null}</span>
                </div>
                <div className='personalInfo-inputContainer'>
                    <label htmlFor='number'>Phone Number</label>
                    <input
                        name='number'
                        type='tel'
                        id='number'
                        ref={numberRef}
                        placeholder='e.g. +1 234 567 890'
                        value={signUp.number}
                        onChange={(e) => { change(e); clearErr(e) }}
                        onBlur={validateInput}
                        pattern='^([\d]|[+])[\d\s]+[\d]$'
                        minLength='9'
                        className={numberErr[1] ? 'invalid' : null}
                        required
                    />
                    <span className={numberErr[1] ? 'invalid' : null}
                    >{numberErr[1] ? numberErr[0] : null}</span>
                </div>
            </div>
            <div className='form-template-btns flex'>
                <div className='form-template-btns-btn'>
                    <button className='nextBtn'>Next Step</button>
                </div>
            </div>
        </form >
    )
}