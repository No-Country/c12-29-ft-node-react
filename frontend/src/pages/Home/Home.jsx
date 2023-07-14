import Contact from './contact/Contact'
import AboutServices from './AboutServices'
import Footer from './Footer'
import Navbar from '../../components/Navbar'
import Box from '@mui/material/Box'
import './styles.home.css'
import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import portadaHome from '../../assets/portadaHome.jpg'

const Home = () => {
  return (
    <>
      <Box as='section' className="boxPrincipalImg" >
        <Navbar isLogged={false}/>
        <Box sx={{ zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '30em' }}>
          <Typography as="h1" sx={{ fontSize: '2em' }}>Abogados</Typography>
          <Typography as="h2" sx={{ fontSize: '1.2em' }}>Servicios de compra y venta de servicios legales</Typography>
          <Button className='btnLinkToLogin' variant="contained" sx={{ margin: '3em 0 0em 0', background: '#FAFF00', width: '248px', borderRadius: 0, '&:hover': { background: '#FAFF00' } }} >
            <Link style={{ color: 'black', width: '100%', textDecoration: 'none' }} to={'/login'}>
              login
            </Link>
          </Button>
        </Box>
      </Box>
      <AboutServices />
      <Contact />
      <Footer />
    </>
  )
}

export default Home
