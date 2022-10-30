import { useState } from 'react'

const Button = ({onClick, text}) => {
        return (
                <button onClick={onClick}>{text}</button>
        )
}
const Header = ({text}) => {
        return (
                <h1>{text}</h1>
        )
}
const StatisticsItem = ({name, value}) => {
        return (
                <p>{name}: {value}</p>
        )
}
const Statistics = ({good, neutral, bad}) => {
        return (
                <div>
                        <Header text="statistics" />
                        <StatisticsItem name="good" value={good} />
                        <StatisticsItem name="neutral" value={neutral} />
                        <StatisticsItem name="bad" value={bad} />
                </div>
        )
}
const App = () => {
        // save clicks of each button to its own state
        const [good, setGood] = useState(0)
        const [neutral, setNeutral] = useState(0)
        const [bad, setBad] = useState(0)

        const incrementGood = () => {
                setGood(good + 1)
        }
        const incrementNeutral = () => {
                setNeutral(neutral + 1)
        }
        const incrementBad = () => {
                setBad(bad + 1)
        }

            
        return (
                <div>
                        <div>
                            <Header text="give feedback" />
                            <Button onClick={incrementGood} text="good" />
                            <Button onClick={incrementNeutral} text="neutral" />
                            <Button onClick={incrementBad} text="bad" />
                        </div>
                        <div>
                            <Statistics good={good} neutral={neutral} bad={bad} />
                        </div>
                </div>

        )
}

export default App
