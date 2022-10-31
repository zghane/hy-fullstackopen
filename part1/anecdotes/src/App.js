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
        const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

        const Button = ({onClick, text}) => {
                return (
                        <button onClick={onClick}>{text}</button>
                )
        }
        const Anecdote = ({text, numVotes}) => {
                return (
                        <>
                        <p>{text}</p>
                        <p>has {numVotes} votes</p>
                        </>
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
            const newPoints = Array.from(points)
            newPoints[selected] += 1
            setPoints(newPoints)
                
        }
        // get the anecdote with most points/votes
        // TODO: a more efficient solution
        // now causes a lookup every time the state changes
        const getMostVoted = () => {
                var highestVotes = 0
                var highestIndex = 0
                for (var i=0; i < points.length; i++) {
                        if (points[i] > highestVotes) {
                                highestVotes = points[i]
                                highestIndex = i
                        }
                }
                return highestIndex
        }



        return (
                <div>
                <h2>Anecdote of the day</h2>
                <Anecdote text={anecdotes[selected]} numVotes={points[selected] ? points[selected] : 0} />
                <Button onClick={chooseAnecdote} text="next anecdote" />
                <Button onClick={incrementPoints} text="vote" />
                <h2>Anecdote with most votes</h2>
                <Anecdote text={anecdotes[getMostVoted()]} numVotes={points[getMostVoted()]} />
                </div>
        )
}

export default App
