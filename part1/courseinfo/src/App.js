const Header = (props) => (
        <h1>Course: {props.name}</h1>
)
const Content = (props) => {
        return (
                <>
                {props.parts.map(part => (
                        <p>{part.name}: {part.numExercises}</p>
                ))}
                </>
        );
}

const Total = (props) => {
        let total = 0
        for (var i=0;i<props.parts.length;i++) {
                total += props.parts[i].numExercises
        }
        return (
                <p>Total number of exercises: {total}</p>
        )
}
const App = () => {
        const course = 'Half Stack application development'
        const parts = [
                {
                        name: "Fundamentals of React",
                        numExercises: 10,
                },
                {
                        name: "Using props to pass data",
                        numExercises: 7,
                },
                {
                        name: "State of a component",
                        numExercises: 14,
                }
        ]

        return (
                <div>
                <Header course={course} />
                <Content parts={parts} />
                <Total parts={parts} />
        }
        </div>
)
}

export default App
