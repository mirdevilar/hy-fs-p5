import { useState } from "react"

import loginService from '../services/loginService'

const Login = ({setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login(username, password)
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  return (
    <>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        Username
        <input 
          type="text"
          value={username}
          name="Username"
          onChange={({target}) => {setUsername(target.value)}}
        /><br />
        Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({target}) => {setPassword(target.value)}}
        /><br />
        <button type="submit">Login</button>
        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
      </form>  
    </>
  ) 
}

export default Login