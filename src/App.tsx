import { FormEvent, useState } from "react"
import { AccountForm } from "./AccountForm"
import { AddressForm } from "./AddressForm"
import { useMultistepForm } from "./useMultistepForm"
import { UserForm } from "./UserForm"

type FormData = {
  firstName: string
  lastName: string
  age: string
  street: string
  city: string
  state: string
  zip: string
  email: string
  password: string
}

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
}


interface EmailData {
  email: string[];
}

const myEmail: EmailData = {
  email: []
};


function App() {
  const [data, setData] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (isLastStep) {
      //check if duplicate emails are in array
      //if duplicate warn the user
      myEmail.email.push(data.email)
      if (new Set(myEmail.email).size !== myEmail.email.length) {
        const seen: { [key: string]: boolean } = {};
        let i = 0;

        while (i < myEmail.email.length) {
          if (seen[myEmail.email[i]]) {
            myEmail.email.splice(i, 1);
          } else {
            seen[myEmail.email[i]] = true;
            i++;
          }
        }
        alert('Duplicate Email Entry'); return back();
      } else {
        alert("Successful Account Creation");
      }
    }
    if (!isLastStep) return next()
  }

  return (
    <div
      style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: ".5rem",
        fontFamily: "Arial",
        maxWidth: "max-content",
      }}
    >
      <form onSubmit={onSubmit}>
        <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end",
          }}
        >
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}
          <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
        </div>
      </form>
    </div>
  )
}

export default App