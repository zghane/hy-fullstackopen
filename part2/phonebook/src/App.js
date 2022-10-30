import { useState } from 'react'

const App = () => {
        const [persons, setPersons] = useState([
                { name: "Arto Hellas", number: "012345689" }
        ]) 
        const [newName, setNewName] = useState('')
        const [newNumber, setNewNumber] = useState('')

        const addPerson = (event) => {
                // prevent form submission / page reload
                event.preventDefault()
                // is the name new? (allow each person only once)
                if (!persons.map(person => person.name).includes(newName)) {
                const newPerson = {name: newName, number: newNumber}
                        setPersons(persons.concat(newPerson))
                        setNewName("")
                        setNewNumber("")
                }
                else {
                        alert(`${newName} is already added to the phonebook`)
                }
        }
        const handleNameFormChange = (event) => {
                setNewName(event.target.value)
        }
        const handleNumberFormChange = (event) => {
                setNewNumber(event.target.value)
        }


        return (
                <div>
                <h2>Phonebook</h2>
                <form onSubmit={addPerson}>
                        <div>
                                name: <input value={newName} onChange={handleNameFormChange}/>
                        </div>
                        <div>
                                number: <input value={newNumber} onChange={handleNumberFormChange}/>
                        </div>
                        <div>
                                <button type="submit">add</button>
                        </div>
                </form>
                <h2>Numbers</h2>
                <ul>
                {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
                </ul>
                </div>
        )
}

export default App
