import { Box, Button, Container, TextField, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Navbar from '../../components/Navbar'
import './styles.login.css'
import loginImg from '../../assets/login.jpg'
import { useGetUserMutation } from '../../redux/userReducer'
import { saveUser } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'

const Login = () => {
  const [show, setShow] = useState(true)
  const navigate = useNavigate()
  const [getUser] = useGetUserMutation('userData')
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
  const dispatch = useDispatch()

  const PASS_REGEX = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,8}$/
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  async function handleLogin (e) {
    e.preventDefault()
    try {
      const { data } = await getUser(user)
      console.log("data en Login",data)
      const userData = {user: data.user, token: data.token }
      console.log("userData: ", userData)
      localStorage.setItem('usuario', JSON.stringify(userData))
      dispatch(saveUser({token: data.token, accountType:data.user.accountType, user:data.user}))
      navigate('/')
    } catch (error) {
      console.log('ERROR MESSAGE:', error.message)
      handleError()
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
    const emailVal = e.target.name.value
    const testEmail = EMAIL_REGEX.test(emailVal)
    if (e.target.name === 'email' && !EMAIL_REGEX.test(e.target.value)) {
      setErrors({ ...errors, [e.target.name]: true })
    } else {
      setErrors({ ...errors, [e.target.name]: false })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSendPressed(true)
    if (e.target[0].value == '') {
      setErrors(errors => ({ ...errors, email: true }))
    }
    if (e.target[2].value === '') {
      setErrors(errors => ({ ...errors, password: true }))
      console.log('En setErrors 2')
    }
    if (e.target[0].value !== '' && e.target[2].value !== '') {
      handleLogin(e)
    } else console.log('NO ENTRA A handleLogin')
  }

  const handleError = () => {
    Swal.fire({
      title: 'Error en logeo, verifique su red o tipo de usuario',
      icon: 'error',
      denyButtonText: 'cerrar',
      timer: 3000
    })
  }

  return (
    <Container maxWidth='false' sx={{ px: { xs: 0 }, background: '#494949', fontFamily: 'koho, sans-serif' }} >
      <Navbar />
      <Grid container sx={{ display: 'flex', flexDirection: 'row', minHeight: '88vh' }} >
        <Grid item xs={12} sm={6} as='form' onSubmit={(e) => handleSubmit(e)} sx={{ color: 'white', display: 'flex', flexDirection: 'column', padding: '5em 15% 0 7%' }}>
          <TextField
            name='email'
            value={user.email}
            onChange={(e) => handleChange(e)}
            placeholder="email..."
            focused={false}
            sx={{
              input: { color: '#FFFFFF' },
              border: '1px solid white',
              borderRadius: '4px',
              '& input::placeholder': {
                color: 'white', opacity: 0.7
              }
            }}
            variant="outlined"
            true={'false'}
            autoComplete='true'
          />
          { (errors.email && sendPressed)
            ? <Typography sx={{ color: 'red', visibility: 'visible' }} >Debe ingresar un email válido</Typography>
            : <Typography sx={{ visibility: 'hidden' }} >Debe ingresar un email válido</Typography>
          }
          <TextField
            name='password'
            value={user.password}
            onChange={handleChange}
            type="password"
            placeholder="password..."
            focused={false}
            sx={{
              margin: '3em 0 0em 0',
              border: '1px solid white',
              input: { color: '#FFFFFF' },
              borderRadius: '4px',
              '& input::placeholder': {
                color: 'white', opacity: 0.7
              }
            }}
          />
          { (errors.password && sendPressed)
            ? <Typography sx={{ color: 'red', visibility: 'visible' }} >password incorrecto</Typography>
            : <Typography sx={{ visibility: 'hidden' }} >password incorrecto</Typography>
          }
            <FormControl focused={false} sx={{ margin: '3em 0 0 0', border: ' 1px solid white', borderRadius: '4px', width: '100%', '& .MuiInputLabel-shrink': { transform: 'translate(14px, -20px) scale(0.75)' } }} >
              <InputLabel id="demo-simple-select-label" sx={{ color: 'white' }}>profesion</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user.userType}
                label="Profesion"
                onChange={handleChange}
                name='userType'
                sx={{ color: 'white', '& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon': { color: 'white' } }}
                required
              >
                <MenuItem value='abogado'>Abogado</MenuItem>
                <MenuItem value='cliente'>Cliente</MenuItem>
              </Select>
            </FormControl>
          <Button type="submit" variant="contained" sx={{ margin: '4em 0 0em 0', color: 'black', background: '#FAFF00', '&:hover': { background: '#FAFF00' } }}>login</Button>
          <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '1em', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: '1.1em' }}>¿No tienes una cuenta?</Typography>
            <Link to={'/signup'} className='linkToRegister' /* style={{ fontSize: '1.1em'}} */>Registrarse</Link>
          </Box>
        </Grid>
        <Grid className='loginBoxImg' item xs={12} sm={6} >
          <img src={loginImg} alt="imagen de fcultad de derecho" width={'100%'} style={{ filter: 'brightness(40%)' }} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
