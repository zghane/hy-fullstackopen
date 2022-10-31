import { useState } from 'react'

const App = () => {
        const anecdotes = [
                'If it hurts, do it more often.',
                'Adding manpower to a late software project makes it later!',
                'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
                'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
                'Premature optimization is the root of all evil.',
                'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
                'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
        ]
        const [selected, setSelected] = useState(0)
        const [points, setPoints] = useState({})

        const Button = ({onClick, text}) => {
                return (
                        <button onClick={onClick}>{text}</button>
                )
        }
        // select random index of array
        const selectRandom = (arr) => {
            return Math.floor(Math.random() * arr.length)
        } 
        const chooseAnecdote = () => {
            setSelected(selectRandom(anecdotes))
        }
        // increment votes for the currently selected/shown anecdote
        const incrementPoints = () => {
            const newPoints = {...points}
            if (newPoints[selected]) {
                    newPoints[selected] += 1
            }
            else {
                    newPoints[selected] = 1
            }
            setPoints(newPoints)
            console.log(points)
                
        }



        return (
                <div>
                <p>{anecdotes[selected]}</p>
                <p>has {points[selected] ? points[selected] : 0} votes</p>
                <Button onClick={chooseAnecdote} text="next anecdote" />
                <Button onClick={incrementPoints} text="vote" />
                </div>
        )
}

export default App
