import { Stack, Button, Typography, Toolbar, Box, AppBar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import NavbarMenu from './NavbarMenu'
import { useGetUserByIdQuery } from '../redux/userReducer'

const Navbar = (props) => {
  const buttonStyle = { fontSize: 16, textTransform: 'none', color: 'white' }
  const user = localStorage.getItem('usuario')
  const userParse = JSON.parse(user)
  let userInfo

  if (userParse) {
    userInfo = userParse
    console.log(userParse)
  }

  return (
    <Box sx={{ width: 1 }}>
      <AppBar position="static" color='transparent'>
        <Toolbar sx={{ pt: 1, pb: 1, display: 'flex' }}>
          <Typography variant="h6" color="common.white" component="div" sx={{ flexGrow: 1 }}>
            LegalTech
          </Typography>
          {userInfo
            ? <Stack direction='row' spacing={5}>
                <NavLink to='/'><Button sx={buttonStyle} color='inherit'>Home</Button></NavLink>
                <NavLink to='/aboutServices'><Button sx={buttonStyle} color='inherit'>Servicios</Button></NavLink>
                <NavbarMenu />
              </Stack>
            : <Stack direction='row' spacing={5}>
                <NavLink to='/'><Button sx={buttonStyle} color='inherit'>Home</Button></NavLink>
                <NavLink to='/aboutServices'><Button sx={buttonStyle} color='inherit'>Servicios</Button></NavLink>
                <NavLink to='/login'><Button sx={buttonStyle} color="inherit">Ingresar</Button></NavLink>
              </Stack>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
