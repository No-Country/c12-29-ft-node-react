import { Stack, Button, Typography, Toolbar, Box, AppBar } from '@mui/material'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box sx={{ width: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Empresa
          </Typography>
          <Stack direction='row' spacing={2}>
            <NavLink to='/'><Button sx={{ fontSize: 12 }} color='inherit'>Home</Button></NavLink>
            <NavLink to='/aboutServices'><Button sx={{ fontSize: 12 }} color='inherit'>Servicios</Button></NavLink>
            <NavLink to='/contact'><Button sx={{ fontSize: 12 }} color='inherit'>Contacto</Button></NavLink>
          </Stack>
          <NavLink to='/login'><Button sx={{ m: 2 }} color="inherit">Login</Button></NavLink>
          <NavLink to='/signup'><Button sx={{ m: 2 }} color="inherit">Registrate</Button></NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
