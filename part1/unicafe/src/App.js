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
const StatisticsLine = ({text, value, symbol=""}) => {
        return (
                <p>{text}: {value} {symbol}</p>
        )
}
const Statistics = ({good, neutral, bad}) => {
        var total = good + neutral + bad
        // feedback scores:
        // good = 1, neutral = 0, bad = -1
        var average = (((good * 1) + (neutral * 0) + (bad * -1))/total).toFixed(2)
        // % of positive feedback of total feedback
        var percentPositive = (good/total).toFixed(2)
        if (total > 0) {
                return (
                        <div>
                        <Header text="statistics" />
                        <StatisticsLine text="good" value={good} />
                        <StatisticsLine text="neutral" value={neutral} />
                        <StatisticsLine text="bad" value={bad} />
                        <StatisticsLine text="total" value={total} />
                        <StatisticsLine text="average" value={average} />
                        <StatisticsLine text="positive" value={percentPositive}/>
                        </div>
                )
        }
        else {
                return (
                        <div>
                        <p>No feedback given</p>
                        </div>
                )
        }
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
