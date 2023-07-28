import { Box, Typography } from "@mui/material"
import { useGetLawyerByIdQuery } from "../redux/userReducer"
import { dateFormater } from "../utils/dateFormater"

const MeetItem = ({lawyerId, date}) => {

  const {data, isSuccess, isLoading, isError, error} = useGetLawyerByIdQuery(lawyerId)
  const {day, numberDayOfMonth ,month, year, hour, minutes, seconds} = dateFormater(date)

  return (
    <Box sx={{margin:'0.3em', border: '1px solid grey', padding:'0.1em 1em 0.1em 1em' }}>
      <Typography>Dr. {data?.firstname}  {data?.lastname}</Typography>
      <Typography> Fecha {day} {numberDayOfMonth}/{month}/{year} Horario: {hour}:{minutes} hs </Typography>
    </Box>   
      
  )
}

export default MeetItem