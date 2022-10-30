const Persons = ({personArray}) => {
        return (
                <ul>
                {personArray.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
                </ul>
        )
}

export default Persons
