const Total = ({parts}) => {
        let total = 0
        for (var i=0;i<parts.length;i++) {
                total += parts[i].exercises
        }
        return (
                <p>Total number of exercises: {total}</p>
        )
}

export default Total
