import React from 'react'

export default function Steps({ num, text, step }) {
    return (
        <li className='steps flex'>
            <div
                className={num == step || (step == 5 && num == 4)
                    ? 'numbered-circles fs-600 fw-b active'
                    : 'numbered-circles fs-600 fw-b'}
                aria-hidden='true'>{`${num}`}</div>
            {num == step ?
                <div className='steps-text flex' aria-current='step'>
                    <p className='uppercase clr-cg fw-r fs-500'>{`step ${num}`}</p>
                    <h2 className='clr-white fw-b uppercase fs-600'>{`${text}`}</h2>
                </div>
                : <div className='steps-text flex' aria-hidden='true'>
                    <p className='uppercase clr-cg fw-r fs-500'>{`step ${num}`}</p>
                    <h2 className='clr-white fw-b uppercase fs-600'>{`${text}`}</h2>
                </div>}
        </li>
    )
}