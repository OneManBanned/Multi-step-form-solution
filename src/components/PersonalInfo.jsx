import { useRef } from 'react'
import FormInput from './FormInput'

export default function PersonalInfo({ signUp, change, next }) {

    const form = useRef(null)

    const inputs = [
        {
            id: 1,
            name: 'username',
            type: 'text',
            placeholder: 'e.g. Stephen King',
            errorMessage: 'name required',
            label: 'Name',
            required: true,
        },
        {
            id: 2,
            name: 'email',
            type: 'email',
            placeholder: 'e.g. stephenking@lorem.com',
            errorMessage: 'must be valid email address',
            label: 'Email Address',
            required: true,
        },
        {
            id: 3,
            name: 'number',
            type: 'tel',
            placeholder: 'e.g. +1 234 567 890',
            errorMessage: 'must be 10 digits, numbers only',
            label: 'Phone Number',
            required: true,
            pattern: '^[0-9]{10}'
        }
    ]



    function handleSubmit(e) {
        e.preventDefault();
        if (!form.current.checkValidity()) {
            return
        } else {
            next(e)
        }
    };

    return (
        <form
            className='form-template personalInfo flex'
            onSubmit={(e) => handleSubmit(e)}
            ref={form}
            noValidate
        >
            <div className='form-template-inputs  flex bg-white clr-mb'>
                <h3 className='fw-b fs-800 form-template-title'>Personal Info</h3>
                <p className='clr-cg fw-m form-template-description'>Please provide your name, email address, and phone number.</p>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={signUp[input.name]}
                        onChange={change}
                        type={input.type}
                    />
                ))}
            </div>
            <div className='form-template-btns flex'>
                <div className='form-template-btns-btn'>
                    <button className='nextBtn'>Next Step</button>
                </div>
            </div>
        </form >
    )

}