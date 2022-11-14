import PropTypes from "prop-types"

const LoginForm = ({onSubmit, username, password, onChangeUsername, onChangePassword}) => {
    return (
        <div>
        <h2>log in to application</h2>
        <form onSubmit={onSubmit}>
        <div>
        username
        <input type="text" value={username} name="Username" onChange={onChangeUsername} />
        </div>
        <div>
        password
        <input type="text" value={password} name="Password" onChange={onChangePassword} />
        </div>
        <button type="submit">login</button>
        </form>
        </div>
    )
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password:  PropTypes.string.isRequired,
    onChangeUsername: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
}


export default LoginForm

