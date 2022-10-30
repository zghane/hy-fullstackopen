import { useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
        const [persons, setPersons] = useState([
                { name: 'Arto Hellas', number: '040-123456', id: 1 },
                { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
                { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
                { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
        ]) 
        const [newName, setNewName] = useState("")
        const [newNumber, setNewNumber] = useState("")
        const [filterString, setFilterString] = useState("")

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
        const handleFilterFormChange = (event) => {
                setFilterString(event.target.value)
        }
        const filterPersons = (persons) => {
                return persons.filter(person =>
                        person.name.toLowerCase().includes(filterString.toLowerCase()))
        }

        return (
                <div>
                        <h2>Phonebook</h2>
                        <Filter filterString={filterString} onChange={handleFilterFormChange} />
                        <h2>Numbers</h2>
                        <h3>Add a new</h3>
                        <PersonForm onSubmit={addPerson} newName={newName} onChangeName={handleNameFormChange} newNumber={newNumber} onChangeNumber={handleNumberFormChange} />
                        <Persons personArray={filterPersons(persons)} />
                </div>
        )
}

export default App
