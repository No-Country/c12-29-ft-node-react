import { Box, Grid, Typography } from "@mui/material"
import Navbar from "../components/Navbar"
import { useEffect } from "react"
import servicesBg from '../assets/servicesBack.jpg'
import { useNavigate } from 'react-router-dom'
import ImgUploader from "../components/ImgUploader"
import { useSelector } from "react-redux"
import ImageModal from "../components/ImageModal"
import { useUpdateLawyerDataMutation } from "../redux/userReducer"


const LawyerPabel = () => {

  const navigate = useNavigate()
  const dataInLocalStorage = localStorage.getItem('usuario')
  const userCredentials = dataInLocalStorage? JSON.parse(dataInLocalStorage).user.accountType : null
  const userId = useSelector( state => state.user.user)
  console.log("userId: ", userId)
  console.log("userType: ", userCredentials)


  useEffect( () => {
    if(!userCredentials) {
      navigate('/')
    }
  },[])

  const [ updateLawyerData, {data, isSuccess, error, isLoading}] = useUpdateLawyerDataMutation()

  return (
    <>
    {
      userCredentials?
      <Box sx={{position: 'relative', zIndex: '0', backgroundImage: `Url(${servicesBg})`, backgroundRepeat:"repeat", backgroundSize: 'cover', minHeight: '100vh'}} >
        <Box sx={{zIndex: '1', color: 'white'}}>
        <Navbar sx={{width: '100%'}}  />
        <Typography 
          variant="h1" 
          sx={{ fontSize: '1.5em',  margin: '2rem 0 0 2rem'}} 
        >
          Panel de usuario abogado
        </Typography>
        <Grid container sx={{marginTop: '3em', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'start', alignItems: 'center', px: '5%'}}>
          <Typography> aun no tienes actividades</Typography>
        </Grid>
        </Box>
        <ImageModal />
      </Box>
      :
      null
    }
    </>
  )
}

export default LawyerPabel