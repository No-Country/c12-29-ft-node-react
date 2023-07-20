import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import img from '../assets/abogadoImg.jpg'
import { Box, Grid } from '@mui/material';


export default function ServicesCard({item}) {

  const specialitiesList = item.specialities.join(', ')

  return (
    <Grid item  xs={12} sm={4}>
      <Card sx={{ /* maxWidth: 345, */ margin: '2em', padding: '1em' }}>
        <CardMedia
          component="img"
          alt="foto de abogado"
          height="auto"
          width="100%"
          /* image={item?.image?.url} */
          image={img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Dr. {item.firstname} {item.lastname}
          </Typography>
          <Typography>Especialidades: {specialitiesList} </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
