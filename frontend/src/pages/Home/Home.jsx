import Contact from './contact/Contact'
import AboutServices from './AboutServices'
import Footer from './Footer'
import Navbar from '../../components/Navbar'
import  Box  from '@mui/material/Box'
import './styles.home.css'
import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <Navbar />
      <Box as='section' className="boxPrincipalImg" /* sx={{ backgroundImage: 'Url(../../home1.jpg)',backgroundSize: "cover", backgroundRepeat: 'no-repeat', width: '100%', height: '45em'}} */> 
        <Typography as="h1">Abogados</Typography>
        <Typography>Servicios de compra y venta de servicios legales</Typography>
        <Button variant="contained" ><Link to={'/login'}>login</Link></Button>
      </Box>
      <AboutServices />
      <Contact  />
      <Footer />
    </>
  )
}

export default Home
