import { Box, Typography } from '@mui/material'
import { dateFormater } from '../utils/dateFormater'

const Meet = ({ data }) => {
  const clientData = data.clientId
  const { day, month, year, hour, minutes, numberDayOfMonth } = dateFormater(data.date)

  return (
    <Box sx={{ minWidth: '320px', border: '1px solid white', p: 1, borderRadius: '4px', m: 1 }}>
      <Typography>Nombre: {clientData.firstname} {clientData.lastname}</Typography>
      <Typography>email: {clientData.email}</Typography>
      <Typography>Fecha: {numberDayOfMonth} de {month}, {year} a las {hour}:{minutes}</Typography>
    </Box>
  )
}

export default Meet
