import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {  Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useCreateMeetMutation } from "../redux/userReducer";
import Swal from "sweetalert2";
import DateTimePickerValue from "./DateTimePickerValue";

export default function ServicesCard({item}) {

  const [selectedDate, setSelectedDate] = useState(new Date())
  const clientId = useSelector( state => state.user?.user._id)
  const userData = useSelector( state => state.user?.user)
  const [createMeet, {data, isLoading, isSuccess, error, isError}] = useCreateMeetMutation({
    fixedCacheKey: 'addMeet',
  })

  const specialitiesList = item.specialities.join(", ");

  const handlerSelectDate = (meetDate) => {
    setSelectedDate(meetDate);
    console.log("meetDate en handleSelectDate", meetDate);
  };

  const infoError = () => {
    Swal.fire({
      title: "Error, intente nuevamnete",
      icon: "error",
      denyButtonText: "cerrar",
      timer: 3000,
      width: "300px",
    });
  };

  const handleContactLawyer = async () => {
    console.log("EN HANDLE");
    try {

			const meet = await createMeet({
				clientId,
				clientData: { lawyerId: item._id, date: selectedDate },
			});
      Swal.fire({
        title: "Se agregó la cita",
        icon: "success",
        denyButtonText: "cerrar",
        timer: 3000,
        width: "300px",
      }).then((result) => {
				if (result) {
				}
			})

    } catch {
      (error) => console.log(error.message);

      Swal.fire({
        title: "Error, intente nuevamnete",
        icon: "error",
        denyButtonText: "cerrar",
        timer: 3000,
        width: "300px",
      });
    }
  };

  useEffect(() => {
    console.log(
      "new Date(selectedDate).toISOString(): ",
      new Date(selectedDate).toISOString()
    );
  }, [selectedDate]);

  return (
    <Grid item xs={12} sm={4}>
      <Card sx={{  margin: "2em", padding: "1em" }}>
        <CardMedia
          component="img"
          alt="foto de abogado"
          height="auto"
          width="100%"
          sx={{ width: "100%", aspectRatio: "1/1" }}
          image={item?.image?.url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Dr. {item.firstname} {item.lastname}
          </Typography>
          <Typography>Especialidades: {specialitiesList} </Typography>
          <Typography variant="body2" color="text.secondary" sx={{height:'5em'}}>
          {item.description}
          </Typography>
          <DateTimePickerValue handlerSelectDate={handlerSelectDate} />
        </CardContent>
        <CardActions>
          <Button onClick={handleContactLawyer} size="small">
            Contactar
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
