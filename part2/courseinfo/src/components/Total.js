const Total = ({parts}) => {
        const total = parts.reduce((sum,nextPart) => sum+nextPart.exercises,0)
        return (
                <p>Total number of exercises: {total}</p>
        )
}

export default Total
