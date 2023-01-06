import React from 'react'

export default function Steps({ num, text, step }) {
    return (
        <div className='steps flex'>
            <div
                className={num == step || (step == 5 && num == 4)
                    ? 'numbered-circles fs-600 fw-b active'
                    : 'numbered-circles fs-600 fw-b'}
                aria-hidden='true'>{`${num}`}</div>
            <div className='steps-text flex'>
                <p className='uppercase clr-cg fw-r fs-500'>{`step ${num}`}</p>
                <p className='clr-white fw-b uppercase fs-600'>{`${text}`}</p>
            </div>
        </div>
    )
}