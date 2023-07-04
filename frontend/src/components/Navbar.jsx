import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Stack } from '@mui/material'

const Navbar = () => {
  return (
    <Box sx={{ width: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Empresa
          </Typography>
          <Stack direction='row' spacing={2}>
            <Button sx={{ fontSize: 12 }} color='inherit'>Home</Button>
            <Button sx={{ fontSize: 12 }} color='inherit'>Servicios</Button>
            <Button sx={{ fontSize: 12 }} color='inherit'>Contacto</Button>
          </Stack>
          <Button sx={{ m: 2 }} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
