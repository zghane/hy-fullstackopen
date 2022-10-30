import { useState } from 'react'

const App = () => {
        const [persons, setPersons] = useState([
                { name: 'Arto Hellas' }
        ]) 
        const [newName, setNewName] = useState('')

        const addPerson = (event) => {
                // prevent form submission / page reload
                event.preventDefault()
                // is the name new? (allow each person only once)
                if (!persons.map(person => person.name).includes(newName)) {
                const newPerson = {name: newName}
                        setPersons(persons.concat(newPerson))
                        setNewName("")
                }
                else {
                        alert(`${newName} is already added to the phonebook`)
                }
        }
        const handleNameFormChange = (event) => {
                setNewName(event.target.value)
        }


        return (
                <div>
                <h2>Phonebook</h2>
                <form onSubmit={addPerson}>
                <div>
                name: <input value={newName} onChange={handleNameFormChange}/>
                </div>
                <div>
                <button type="submit">add</button>
                </div>
                </form>
                <h2>Numbers</h2>
                <ul>
                {persons.map(person => <li key={person.name}>{person.name}</li>)}
                </ul>
                </div>
        )
}

export default App
