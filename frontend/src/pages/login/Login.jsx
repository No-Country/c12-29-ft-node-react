import { Box, Button, Container, TextField, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Navbar from '../../components/Navbar'
import './styles.login.css'
import loginImg from '../../assets/login.jpg'
import { useGetUserMutation } from '../../redux/userReducer'
const Login = () => {
  const navigate = useNavigate()
	const [getUser]= useGetUserMutation()
  const [user, setUser] = useState({
    email: '',
    password: '',
		userType: ''
  })

  const [errors, setErrors] = useState({
    email: false,
    password: false
		
  })

  const [sendPressed, setSendPressed] = useState(false)

  const PASS_REGEX = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,8}$/
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 

  async function handleLogin(e) {
    e.preventDefault()
      try {
				const response = getUser()
				console.log(response);
        // const getToken = await fetch(`http://localhost:3001/api/auth/signup`, {
        //   method: 'post',
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(user)
        // })
        // const response = await getToken.json()
        // console.log('response: ', response)
      } catch (error) {
          console.log("ERROR MESSAGE:", error.message)
      }

  //   fetch('http://localhost:3001/api/auth/signin?IsClient=true', {
  //     method: 'post',
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //       /* 'Access-Control-Allow-Origin': 'http://localhost:5173' */
  //     },

  //     body: JSON.stringify(user)
  //   })
  //   .then(response => response.json() )
  //   .catch(error => console.log("ERROR MESSAGE:", error.message))
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
    console.log("e: ", e.target.name)
    const emailVal = e.target.name.value
    const testEmail = EMAIL_REGEX.test(emailVal);
    console.log("testEmail: ", testEmail)
    if (e.target.name === 'email' && !EMAIL_REGEX.test(e.target.value)) {
			console.log("en setError");
      setErrors({ ...errors, [e.target.name]: true })
		} else {
      console.log("else!!")
      setErrors({ ...errors, [e.target.name]: false })
    }
  }
  console.log("ERRORS: ", errors)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSendPressed(true)
    if (e.target[0].value == '') {
      setErrors( errors => ({ ...errors, email: true} ))
    }
    if (e.target[2].value === '') {
      setErrors( errors => ({ ...errors, password: true}) )
      console.log("En setErrors 2")
    }

    console.log("e.target[0].value: ",e.target[0].value, "  name: ", e.target[0].name)
    console.log("e.target[2].value: ",e.target[2].value, "  name: ", e.target[2].name)
    if ( e.target[0].value !==''  && e.target[2].value !== '' ) {
      handleLogin(e)
    } else console.log("NO ENTRA A handleLogin")
  }
  console.log("ERRORS despues: ", errors)

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
            value={user.email}
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
          { (errors.email && sendPressed)? 
            <Typography sx={{ color: 'red', visibility: 'visible' }} >Debe ingresar un email válido</Typography>
            :
            <Typography sx={{ visibility: 'hidden' }} >Debe ingresar un email válido</Typography>
          }
          <TextField
            name='password'
            value={user.password}
            onChange={handleChange}
            type="password" 
            placeholder="password..." 
            sx={{  margin: '3em 0 0em 0', input: {color: '#FFFFFF', border: '1px solid white' }, 
              border: '1px solid white', 
              '& input::placeholder': {
                color: 'white', opacity:0.7
              }
            }}
          />
          { (errors.password && sendPressed)? 
            <Typography sx={{ color: 'red', visibility: 'visible' }} >password incorrecto</Typography>
            :
            <Typography sx={{ visibility: 'hidden' }} >password incorrecto</Typography>
          }
          <Button type="submit" variant="contained" sx={{ margin: '3em 0 0em 0' , color: 'black', background: '#FAFF00', '&:hover' : {background: '#FAFF00'}}}>login</Button>
          <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '1em', justifyContent: 'center'}}> 
            <Typography>¿No tienes una cuenta?</Typography>
            <Button><Link to={'/signup'}>Registrarse</Link></Button>
          </Box>
        </Grid>
        <Grid className='loginBoxImg' item xs={12} sm={7} >
          <img src={loginImg} alt="imagen de fcultad de derecho" width={'100%'} style={{ filter: 'brightness(40%)'}}  />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
