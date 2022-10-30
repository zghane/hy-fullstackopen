const Total = (props) => {
        let total = 0
        for (var i=0;i<props.parts.length;i++) {
                total += props.parts[i].numExercises
        }
        return (
                <p>Total number of exercises: {total}</p>
        )
}

export default Total
