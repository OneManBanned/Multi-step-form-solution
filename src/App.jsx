import { useState } from 'react'
import '../dist/css/app.css'

// Components

import PersonalInfo from './components/PersonalInfo'
import Plan from './components/Plan'
import AddOns from './components/AddOns'
import Confirmation from './components/Confirmation'
import Success from './components/Success'
import Steps from './components/Steps'

function App() {

  // State

  // Stage represents the stage of the form the user is currently on
  const [stage, setStage] = useState(1)
  // State containting form data
  const [signUp, setSignUp] = useState({
    username: '',
    email: '',
    number: '',
    planLength: 'yearly',
    planLevel: 'arcade',
    onlineService: false,
    largerStorage: false,
    customizableProfile: false,
  })


  return (
    <main className="container" aria-live='polite'>
      <h1 className='sr-only'>Registration</h1>
      <div className='container-tabs'>
        <div className='container-tabs-tab'>
          {<Steps num='1' text='your info' step={stage} />}
          {<Steps num='2' text='select plan' step={stage} />}
          {<Steps num='3' text='add-ons' step={stage} />}
          {<Steps num='4' text='summary' step={stage} />}
        </div>
      </div>
      {formStep()}
    </main>
  )

  // Go to next step of form
  function nextStep(e) {
    e.preventDefault()
    if (stage < 5)
      setStage(prevState => prevState += 1)
  }

  // Go to previous step of form
  function prevStep(e) {
    e.preventDefault()
    if (stage > 1)
      setStage(prevState => prevState -= 1)
  }

  // Handle changes to form information
  function handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name
    setSignUp(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  function handleClick(e) {
    e.preventDefault()
    const target = e.target;
    const name = target.name
    setSignUp(prevState => {
      return {
        ...prevState,
        [name]: prevState.planLength === 'monthly' ? 'yearly' : 'monthly'
      }
    })
  }

  // Display the current step of the form
  function formStep() {
    switch (stage) {
      case 1:
        return <PersonalInfo
          next={nextStep}
          change={handleChange}
          signUp={signUp}
        />
      case 2:
        return <Plan
          previous={prevStep}
          next={nextStep}
          change={handleChange}
          signUp={signUp} />
      case 3:
        return <AddOns
          previous={prevStep}
          next={nextStep}
          change={handleChange}
          signUp={signUp}
          stage={stage} />
      case 4:
        return <Confirmation
          previous={prevStep}
          next={nextStep}
          click={handleClick}
          signUp={signUp}
        />
      case 5:
        return <Success />
      default:
    }
  }
}

export default App
