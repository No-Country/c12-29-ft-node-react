import { Box, Typography } from "@mui/material"
import { useGetLawyerByIdQuery } from "../redux/userReducer"
import { useEffect } from "react"
import { dateFormater } from "../utils/dateFormater"

const MeetItem = ({lawyerId, date}) => {

  const {data, isSuccess, isLoading, isError, error} = useGetLawyerByIdQuery(lawyerId)
  const {day, numberDayOfMonth ,month, year, hour, minutes, seconds} = dateFormater(date)
  console.log(numberDayOfMonth)
  useEffect(() => {
    data? console.log("data en MeetItem: ", data):console.log("no hay data en MeetItem")
    error? console.log("error: ", error):null
    console.log("day", day)
  },[data, error, day])
  console.log("meetId: ", lawyerId)
  console.log("date: ", date)
  console.log("isError: ", isError)
  console.log("isLoadin: ", isLoading)
  console.log("isSuccess: ", isSuccess)
  return (
    <Box sx={{margin:'0.3em', border: '1px solid grey', padding:'0.1em 1em 0.1em 1em' }}>
      {/* <Typography>{meetId}</Typography> */}
      <Typography>Dr. {data?.firstname}  {data?.lastname}</Typography>
      <Typography> Fecha {day} {numberDayOfMonth}/{month}/{year} Horario: {hour}:{minutes} hs </Typography>
    </Box>   
      
  )
}

export default MeetItem