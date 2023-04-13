import { FormWrapper } from "./FormWrapper";

type UserData = {
    firstName: string,
    lastName: string,
    age: string
}
type UserFormProps = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}

export function UserForm({firstName, lastName, age, updateFields}: UserFormProps) {
    return (
        <FormWrapper title='User Details'>
        <label>First Name</label>
        <input type="text" required autoFocus value={firstName} onChange={e => updateFields({firstName: e.target.value})}/>
        <label htmlFor="">Last Name</label>
        <input type="text" required value={lastName} onChange={e => updateFields({lastName: e.target.value})}/>
        <label htmlFor="">Age</label>
        <input type="number" min={1} required value={age} onChange={e => updateFields({age: e.target.value})}/>
        </FormWrapper>
    )
}