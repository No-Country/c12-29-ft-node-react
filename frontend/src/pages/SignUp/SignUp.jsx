import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'

import { useAddUserMutation } from '../../redux/userReducer'
import img_signup from '../../assets/img_signup.png'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()
  const [addUser] = useAddUserMutation()

  const [input, setInput] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
    license: '',
    userType: ''
  })

  const [error, setError] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
    license: '',
    userType: ''
  })

  const [disabled, setDisabled] = useState(false)

  const handleChange = (e) => {
    const { value, name } = e.target
    setInput({
      ...input,
      [name]: value
    })

    if (name !== 'license' && value.length < 4) {
      setError({
        ...error,
        [name]: 'Tiene que tener mas de 3 caracteres'
      })
    } else {
      if (name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        emailRegex.test(value) ? setError({ ...error, email: '' }) : setError({ ...error, email: 'Debes proporcionar un email valido' })
      } else if (name === 'password') {
        const nameRegex = /^[A-Za-z]+$/
        nameRegex.test(value) ? setError({ ...error, password: '' }) : setError({ ...error, password: 'Debes proporcionar una contraseña valida' })
      } else if (name === 'firstname') {
        const nameRegex = /^[A-Za-z]+$/
        nameRegex.test(value) ? setError({ ...error, firstname: '' }) : setError({ ...error, firstname: 'Debes proporcionar un nombre valido' })
      } else if (name === 'confirmpassword') {
        value === input.password ? setError({ ...error, confirmpassword: '' }) : setError({ ...error, confirmpassword: 'Las contraseñas deben coincidir' })
      } else if (name === 'lastname') {
        const nameRegex = /^[A-Za-z]+$/
        nameRegex.test(value) ? setError({ ...error, lastname: '' }) : setError({ ...error, lastname: 'Debes proporcionar un lastname valido' })
      } else {
        setError({
          ...error,
          [name]: ''
        })
      }
    }
  }

  useEffect(() => {
    const isDisabled = !!(!input.lastname || !input.confirmpassword || !input.password || !input.email || !input.firstname || error.lastname || error.confirmpassword || error.password || error.email || error.firstname)
    disabled !== isDisabled && setDisabled(isDisabled)
  }, [input, error])

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await addUser(input)
      navigate('/login')
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
  <Container maxWidth='false' sx={{ px: { xs: 0 }, background: '#494949', minHeight: '100vh' }} >
     <Navbar />
     <Grid container sx={{ display: 'flex', flexDirection: 'row' }} >
        <Grid item xs={12} sm={5} as='form' onSubmit={handleRegister} sx={{ color: 'white', display: 'flex', flexDirection: 'column', padding: '5em 5em 0 5em' }}>

            <Grid>
            <TextField
            id="outlined-controlled"
            label="Nombre"
            name='firstname'
            type={'text'}
            value={input.firstname}
            onChange={handleChange}
            error={error.firstname.length > 1}
            helperText={error.firstname}
            sx={{
              input: { color: '#FFFFFF' },
              width: '38%',
              marginRight: '4%'
            }}
            />
            <TextField
                    id="outlined-controlled"
                    label="Apellido"
                    name='lastname'
                    type={'text'}
                    value={input.lastname}
                    onChange={handleChange}
                    error={error.lastname.length > 1}
                    helperText={error.lastname}
                    sx={{ width: '38%' }}
            />
            </Grid>

            <TextField
                    id="outlined-controlled"
                    label="Email"
                    name='email'
                    type={'email'}
                    value={input.email}
                    onChange={handleChange}
                    error={error.email.length > 1}
                    helperText={error.email}
                    sx={{ width: '80%', margin: '3% 0% 3% 0%' }}
            />

            <TextField
                id="outlined-controlled"
                label="Contraseña"
                name='password'
                type={'password'}
                value={input.password}
                onChange={handleChange}
                error={error.password - length > 1}
                helperText={error.password}
                sx={{ width: '80%', margin: '3% 0% 3% 0%' }}
                />

            <TextField
                    id="outlined-controlled"
                    label="Confirmar Contraseña"
                    name='confirmpassword'
                    type={'password'}
                    value={input.confirmpassword}
                    onChange={handleChange}
                    error={error.confirmpassword.length > 1}
                    helperText={error.confirmpassword}
                    sx={{ width: '80%', margin: '3% 0% 3% 0%' }}
            />

            <TextField
                    id="outlined-controlled"
                    label="Numero de Matricula"
                    name='license'
                    value={input.license}
                    onChange={handleChange}
                    sx={{ width: '80%', margin: '3% 0% 3% 0%' }}
                    />

                <FormControl sx={{ width: '80%', margin: '3% 0% 3% 0%' }} >
                    <InputLabel id="demo-simple-select-label">Profesion</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={input.userType}
                        label="Profesion"
                        onChange={handleChange}
                        name='userType'
                        >
                        <MenuItem value='abogado'>Abogado</MenuItem>
                        <MenuItem value='cliente'>Cliente</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" sx={{ margin: '3em 0 0em 0', color: 'black', background: '#FAFF00', '&:hover': { background: '#FAFF00' } }} disabled={disabled}>Registrate!</Button>
        </Grid>
        {/* <Grid item xs={12} sm={7} >
            <img src={img_signup} alt='imagen' width={'100%'} height={'50%'}/>
        </Grid> */}
        </Grid>
    </Container>
  )
}

export default SignUp
