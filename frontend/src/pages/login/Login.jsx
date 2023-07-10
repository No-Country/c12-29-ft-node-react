import { Box, Button, Container, TextField, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Navbar from '../../components/Navbar'
import './styles.login.css'
/* import loginImg from '../../../public/back2 1(1).jpg' */

const Login = () => {
  const navigate = useNavigate()

  const [login, setLogin] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const [sendPressed, setSendPressed] = useState(false)

  const user = {
    email: `${login.email}`,
    password: `${login.password}`
  }

  const PASS_REGEX = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,8}$/
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const NAME_REGEX = /^[a-zA-Z, ]{3,18}$/

  /* const ValidateEmail = (e) => {
    setSendPressed(true)
    if (e.target.value.match(NAME_REGEX)) {
			console.log("true!!");
      setErrors({ ...errors, email: true })
		} 
  } */
  

  async function handleLogin(e) {
    e.preventDefault()
      /* try {
        const getToken = await fetch('http://localhost:3001/api/auth/signup', {
          method: 'post',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user)
        })
        const response = await getToken.json()
        console.log('response: ', response)
      } catch (error) {
          console.log("ERROR MESSAGE:", error.message)
      } */

    fetch('http://localhost:3001/api/auth/signup', {
      method: 'post',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': 'http://localhost:5173'
      },

      body: JSON.stringify(user)
    })
    .then(response => response.json() )
    .catch(error => console.log("ERROR MESSAGE:", error.message))
  }

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }
  console.log("user: ", user.email)
  console.log("ERRORS: ", errors.email)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSendPressed(true)
    if (e.target.name === 'email' && e.target.value.match(EMAIL_REGEX)) {
      setUser({ ...user, [e.target.name]: e.target.value })
		} 
    if (e.target.name === 'email' && !e.target.value.match(EMAIL_REGEX)) {
			console.log("true!!:  ", !e.target.value.match(EMAIL_REGEX) );
      setErrors({ ...errors, [e.target.name]: true })
		} 
    if (e.target.name === 'password' && e.target.value.match(PASS_REGEX)) {
      setUser({ ...user, [e.target.name]: e.target.value })
		} 
    if (e.target.name === 'password' && !e.target.value.match(PASS_REGEX)) {
			console.log("true!!");
      setErrors({ ...errors, [e.target.name]: true })
		} 
  }
  /* const handleLogin = (event) => {
    event.preventDefault()
    Swal.fire({
      title: 'Login Sucess',
      icon: 'success',
      denyButtonText: 'ok'
    }).then(() => {
      navigate('/')
    })
  } */


  return (
    <Container maxWidth='false' sx={{px: {xs:0}, background: '#494949'}} >
      <Navbar />
      <Grid container sx={{ display: 'flex', flexDirection: 'row', minHeight: '88vh'}} >
        <Grid item xs={12} sm={5} as='form' onSubmit={(e) => handleSubmit(e)} sx={{color: 'white', display: 'flex', flexDirection:'column', padding: '5em 5em 0 5em'}}>
          <TextField
            name='email'
            value={login.email}
            onChange={(e) => handleChange(e)}
            /* type="email"  */
            placeholder="email..." 
            sx={{ input: {color: '#FFFFFF' }, 
              border: '1px solid white', 
              '& input::placeholder': {
                color: 'white', opacity:0.7
              }
            }}
            variant="outlined"
            true={'false'}
          />
          {/* <Typography sx={{ color: 'red' , visibility: errors.email? 'visible' : 'hidden' }} >Debe ingresar un email válido</Typography> */}
          <TextField
            /* variant="outlined" */
            name='password'
            value={login.password}
            onChange={handleChange}
            type="password" 
            placeholder="password..." 
            sx={{ margin: '3em 0 3em 0' ,input: {color: '#FFFFFF', border: '1px solod white' }, 
              border: '1px solid white', 
              '& input::placeholder': {
                color: 'white', opacity:0.7
              }
            }}
            /* className='loginTextField' */
          />
          <Button type="submit" variant="contained" sx={{color: 'black', background: '#FAFF00', '&:hover' : {background: '#FAFF00'}}}>login</Button>
        </Grid>
        <Grid className='loginImg' item xs={12} sm={7} >
          <img src="./portadaLogin2.jpg" alt="imagen de fcultad de derecho" width={'100%'} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
