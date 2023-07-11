import * as React from 'react'
import Button from '@mui/material/Button'
import { Menu, MenuItem, ListItemIcon } from '@mui/material'
import { NavLink } from 'react-router-dom'
import Logout from '@mui/icons-material/Logout'

export default function NavbarMenu () {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ fontSize: 12, textTransform: 'none', color: 'white', backgroundColor: 'gray' }}
      >
        User
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
        <MenuItem onClick={handleClose}>
          <NavLink to='/'>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
            Logout
            </NavLink>
        </MenuItem>
      </Menu>
    </div>
  )
}
