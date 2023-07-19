import * as React from 'react'
import Button from '@mui/material/Button'
import { Menu, MenuItem, ListItemIcon } from '@mui/material'
import { NavLink } from 'react-router-dom'
import Logout from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'

export default function NavbarMenu () {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    window.location.reload()
  }
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ pl: 2, pr: 2, fontSize: 16, textTransform: 'none', color: 'white', backgroundColor: 'gray' }}
      >
        Usuario
        <ListItemIcon sx={{ justifyContent: 'flex-end' }}>
          <PersonIcon fontSize='small'/>
        </ListItemIcon>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}

      >
        <MenuItem onClick={handleLogout}>
          <NavLink to='/'>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
            Cerrar sesión
            </NavLink>
        </MenuItem>
      </Menu>
    </div>
  )
}
