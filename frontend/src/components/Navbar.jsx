import { Stack, Button, Typography, Toolbar, Box, AppBar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import NavbarMenu from './NavbarMenu'

const Navbar = (props) => {
  const isLogged = props.isLogged
  const buttonStyle = { fontSize: 12, textTransform: 'none', color: 'white' }
  return (
    <Box sx={{ width: 1 }}>
      <AppBar position="static" color='transparent'>
        <Toolbar sx={{ pt: 1, pb: 1, display: 'flex' }}>
          <Typography variant="h6" color="common.white" component="div" sx={{ flexGrow: 1 }}>
            LegalTech
          </Typography>
          {isLogged
            ? <Stack direction='row' spacing={2}>
                <NavLink to='/'><Button sx={buttonStyle} color='inherit'>Home</Button></NavLink>
                <NavLink to='/aboutServices'><Button sx={buttonStyle} color='inherit'>Servicios</Button></NavLink>
                <NavbarMenu />
              </Stack>
            : <Stack direction='row' spacing={2}>
                <NavLink to='/'><Button sx={buttonStyle} color='inherit'><p>Home</p></Button></NavLink>
                <NavLink to='/aboutServices'><Button sx={buttonStyle} color='inherit'><p>Servicios</p></Button></NavLink>
                <NavLink to='/login'><Button sx={buttonStyle} color="inherit"><p>Ingresar</p></Button></NavLink>
                <NavLink to='/signup'><Button sx={buttonStyle} color="inherit"><p>Registrarse</p></Button></NavLink>
              </Stack>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
