import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import servicesBg from '../assets/servicesBack.jpg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ImageModal from '../components/ImageModal'
import { useUpdateLawyerDataMutation } from '../redux/userReducer'

const LawyerPabel = () => {
  const navigate = useNavigate()
  const dataInLocalStorage = localStorage.getItem('usuario')
  const userCredentials = dataInLocalStorage ? JSON.parse(dataInLocalStorage).user.accountType : null
  const lawyerId = useSelector(state => state.user.user._id)
  const [updateLawyerData] = useUpdateLawyerDataMutation()

  const [profile, setProfile] = useState({
    specialty: '',
    description: ''
  })

  const handleSelect = (e) => {
    const { value, name } = e.target
    setProfile({
      ...profile,
      [name]: value
    })
  }

  const handleTextField = (e) => {
    const { value } = e.target
    setProfile({
      ...profile,
      description: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (profile) {
      const lawyerData = new FormData()
      lawyerData.append('specialities', [profile.specialty])
      lawyerData.append('description', profile.description)
      const dataquery = {
        lawyerId,
        lawyerData
      }
      updateLawyerData(dataquery).unwrap()
        .catch((error) => console.error(error))
    }
  }

  useEffect(() => {
    if (!userCredentials) {
      navigate('/')
    }
  }, [])

  return (
    <>
    {
      userCredentials
        ? <Box sx={{ position: 'relative', zIndex: '0', backgroundImage: `Url(${servicesBg})`, backgroundRepeat: 'repeat', backgroundSize: 'cover', minHeight: '100vh' }} >
        <Box sx={{ zIndex: '1', color: 'white' }}>
        <Navbar sx={{ width: '100%' }} />
        <Typography
          variant="h1"
          sx={{ fontSize: '1.5em', margin: '2rem 0 0 2rem' }}
        >
          Panel de usuario abogado
        </Typography>
        <Grid container sx={{ marginTop: '3em', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'start', alignItems: 'center', px: '5%' }}>
          <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
          <Typography> aun no tienes actividades</Typography>
          </Box>
          <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ mt: 2, mb: 4 }}>Perfil</Typography>
            <form action="" onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FormControl focused={false} sx={{ mb: 3, display: 'flex', flexDirection: 'column', minWidth: 140, border: ' 1px solid white', borderRadius: '4px', '& .MuiInputLabel-shrink': { transform: 'translate(14px, -20px) scale(0.75)' } }}>
                <InputLabel sx={{ color: 'white' }}>Especialidad</InputLabel>
                <Select
                  value={profile.specialty}
                  label="especialidad"
                  sx={{ color: 'white', '& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon': { color: 'white' } }}
                  onChange={handleSelect}
                  name='specialty'
                >
                  <MenuItem value="">
                    <em>Ninguna</em>
                  </MenuItem>
                  <MenuItem value={'civil'}>Civil</MenuItem>
                  <MenuItem value={'familia'}>Familia</MenuItem>
                  <MenuItem value={'penal'}>Penal</MenuItem>
                  <MenuItem value={'laboral'}>Laboral</MenuItem>
                </Select>
              </FormControl>
              <TextField
                sx={{
                  border: ' 1px solid white',
                  borderRadius: '4px',
                  '& .MuiInputLabel-shrink': { transform: 'translate(14px, -20px) scale(0.75)' },
                  '& label.css-6gguzh-MuiFormLabel-root-MuiInputLabel-root': { color: 'white' },
                  '& label.css-h7lfeh-MuiFormLabel-root-MuiInputLabel-root': { color: 'white' },
                  '& textarea.css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input': { color: 'white' }
                }}
                value={profile.description}
                label='descripcion'
                onChange={handleTextField}
                multiline
                rows={5}
                focused={false}
                inputProps={{ maxLength: 150 }}
              />
              <Button type='submit' sx={{
                mt: 3,
                display: 'block',
                width: { xs: '120px', sm: '140px' },
                background: '#FAFF00',
                color: 'black',
                '&:hover': { background: '#FAFF00' },
                '& .Mui-focusVisible': { background: '#FAFF00' },
                textAlign: 'center',
                fontSize: '1em',
                lineHeight: '1.1em',
                padding: '6px 4px 6px 4px',
                borderRadius: '4px'
              }}
              >
                Guardar
              </Button>
              </Box>
            </form>
            <ImageModal />
          </Box>
        </Grid>

        </Box>
      </Box>
        : null
    }
    </>
  )
}

export default LawyerPabel
