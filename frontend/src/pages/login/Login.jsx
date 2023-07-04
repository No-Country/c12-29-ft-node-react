import { Button, Container, TextField } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"


const Login = () => {

  const navigate = useNavigate()

  const [login, setLogin] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) =>{
    setLogin({
      ...login,
      [event.target.name]: event.target.value
    })
    
  }

  const handleLogin = (event) => {
    event.preventDefault()
    Swal.fire({
      title: 'Login Sucess',
      icon: 'success',
      denyButtonText: 'ok',
    }).then(() => {
      navigate('/') 
    })
  }


  return (
    <Container>
      <form onSubmit={handleLogin}>
        <TextField
        name='email'
        value={login.email}
        onChange={handleChange}
        type="email" placeholder="email..." />
        <TextField
        name='password'
        value={login.password}
        onChange={handleChange}
        type="password" placeholder="password..." />
        <Button type="submit" color="primary">login</Button>   
      </form>
    </Container>
  )
}

export default Login