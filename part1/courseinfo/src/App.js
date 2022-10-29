const Header = (props) => (
        <h1>Course: {props.course.name}</h1>
)
const Part = (props) => (
        <p>{props.name}: {props.numExercises}</p>
)

const Content = (props) => {
        return (
                <>
                {props.parts.map(part => (
                        <Part name={part.name} numExercises={part.numExercises} />
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
        const course = {
                name: "Half stack application development",
                parts: [
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
}

        return (
                <div>
                <Header course={course} />
                <Content parts={course.parts} />
                <Total parts={course.parts} />
        </div>
)
}

export default App
