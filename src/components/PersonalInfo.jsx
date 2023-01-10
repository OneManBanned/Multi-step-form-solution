import { useState, useEffect, useRef } from 'react'

export default function PersonalInfo({ signUp, change, next }) {

    // If valid === true user can continue onto next stage of form
    const [valid, setValid] = useState(false)

    // Messages for validation errors
    const [nameErr, setNameErr] = useState(undefined)
    const [emailErr, setEmailErr] = useState(undefined)
    const [numErr, setNumErr] = useState(undefined)


    const nameElement = useRef();
    const emailElement = useRef();
    const numberElement = useRef();
    const buttonElement = useRef();

    useEffect(() => {
        if (nameElement.current)
            nameElement.current.focus()
    }, [])

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
            <div className='form-template-inputs  flex bg-white clr-mb'>
                <h3 className='fw-b fs-800 form-template-title'>Personal Info</h3>
                <p className='clr-cg fw-m form-template-description'>Please provide your name, email address, and phone number.</p>
                <div className='personalInfo-inputContainer'>
                    <label htmlFor="name" className='fs-500 fw-m clr-mb'>Name</label>
                    <div className='err clr-rd'
                        id='nameError'
                    >{nameErr}</div>
                    <input type="text" id='name' name='name'
                        ref={nameElement}
                        aria-describedby='nameError'
                        autoComplete='true'
                        className={nameErr ? 'error' : ''}
                        placeholder='e.g. Stephen King'
                        value={signUp.name}
                        onChange={(e) => { change(e), emptyErr(e) }}
                        onBlur={(e) => errMsg(e)}
                    />
                </div>
                <div className='personalInfo-inputContainer'>
                    <label htmlFor="email" className='fs-500 fw-m clr-mb'>Email Address</label>
                    <div className='err clr-rd'
                        id='emailError'
                    >{emailErr}</div>
                    <input type="email" id='email' name='email'
                        ref={emailElement}
                        aria-describedby='emailError'
                        autoComplete='true'
                        className={emailErr ? 'error' : ''}
                        placeholder='e.g. stephenking@lorem.com'
                        value={signUp.email}
                        onChange={(e) => { change(e), emptyErr(e) }}
                        onBlur={(e) => errMsg(e)}
                    />
                </div>
                <div className='personalInfo-inputContainer'>
                    <label htmlFor="number" className='fs-500 fw-m clr-mb'>Phone Number</label>
                    <div className='err clr-rd'
                        id='numberError'
                    >{numErr}</div>
                    <input type="number" id="tel" name='number'
                        ref={numberElement}
                        aria-describedby='numberError'
                        aria-relevant='all'
                        autoComplete='true'
                        className={numErr ? 'error' : ''}
                        placeholder='e.g +1 234 567 890'
                        value={signUp.number}
                        onChange={(e) => { change(e), emptyErr(e) }}
                        onBlur={(e) => errMsg(e)}
                    />
                </div>
            </div>
            <div className='form-template-btns flex'>
                <div className='form-template-btns-btn'>
                    <button ref={buttonElement} className='nextBtn' onClick={!valid ?
                        () => {
                            buttonElement.current.focus()
                            if (numErr) {
                                numberElement.current.focus()
                            }
                            if (emailErr) {
                                emailElement.current.focus()
                            }
                            if (nameErr) {
                                nameElement.current.focus()
                            }
                        } : next}>Next Step</button>
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
        }
        if (signUp.number === '') {
            setNumErr('Field required - numbers only')
        }
    }

    function emptyErr(e) {
        let { name } = e.target
        switch (name) {
            case 'name':
                setNameErr('')
                break;
            case 'email':
                setEmailErr('')
                break;
            case 'number':
                setNumErr('')
            default:
                undefined
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
                    setNumErr('Field required - numbers only')
                } else {
                    setNumErr(undefined)
                }
                break;
            default:
                undefined
        }
    }
}