import { Box, Grid, Typography } from "@mui/material"
import Navbar from "../components/Navbar"
import { useEffect } from "react"
import servicesBg from '../assets/servicesBack.jpg'
import { useNavigate } from 'react-router-dom'
import ImgUploader from "../components/ImgUploader"

const LawyerPabel = () => {

  const navigate = useNavigate()
  const dataInLocalStorage = localStorage.getItem('usuario')
  const userCredentials = dataInLocalStorage? JSON.parse(dataInLocalStorage).user.accountType : null
  console.log("userType: ", userCredentials)
  useEffect( () => {
    if(!userCredentials) {
      navigate('/')
    }
  },[])

  return (
    <>
    {
      userCredentials?
      <Box sx={{position: 'relative', zIndex: '0', background: 'black', backgroundImage: `Url(${servicesBg})`, backgroundRepeat:"repeat", backgroundSize: 'cover', minHeight: '100vh'}} >
        <Box sx={{zIndex: '1', color: 'white'}}>
        <Navbar sx={{width: '100%'}}  />
        <Typography variant="h1" sx={{ fontSize: '1.5em',  margin: '2rem 0 0 2rem'}} >Panel de usuario agogado</Typography>
        <Grid container sx={{marginTop: '3em', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'start', alignItems: 'center', px: '5%'}}>
          <Typography> aun no tienes actividades</Typography>
        </Grid>
        </Box>
        <ImgUploader />
      </Box>
      :
      null
    }
    </>
  )
}

export default LawyerPabel