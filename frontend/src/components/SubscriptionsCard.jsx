import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'

const SubscriptionsCard = ({ data }) => {
  const handleSubscription = () => {

  }
  return (
      <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '300px', width: '180px', margin: '2em', padding: '1em' }}>
          <CardContent sx={{ height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
              {data.name}
            </Typography>
            {data.name === 'Premium+'
              ? <Typography>Éste plan cuenta con reuniones ilimitadas, y máximo {data.specialities} especialidades</Typography>
              : <Typography>Éste plan cuenta con {data.meets} reuniones, y máximo {data.specialities} especialidades</Typography>
          }
            <Typography variant="body2" color="text.secondary" fontSize={18}>
              ${data.price}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={handleSubscription} sx={{ color: 'black', background: '#FAFF00', '&:hover': { background: '#FAFF00' } }} size="small">
              Comprar
            </Button>
          </CardActions>
      </Card>
  )
}

export default SubscriptionsCard
