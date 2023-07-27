import Footer from './Home/Footer'
import Navbar from '../components/Navbar'
import servicesBg from '../assets/servicesBack.jpg'
import { Box, Grid, Typography } from '@mui/material'
import SubscriptionsCard from '../components/SubscriptionsCard'
import { useGetSubscriptionsQuery } from '../redux/userReducer'

const Subscriptions = () => {
  const dataInLocalStorage = localStorage.getItem('usuario')
  const userCredentials = dataInLocalStorage ? JSON.parse(dataInLocalStorage) : null

  const { data } = useGetSubscriptionsQuery()
  console.log(data)
  return (
    <>
      <Box
        as='section'
        sx={{
          backgroundImage: `url(${servicesBg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '125vh',
          color: 'white',
          position: 'relative'
        }}
      >
        <Navbar/>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography
          variant="h1"
          sx={{ fontSize: '1.5em', margin: '2rem 0 0 2rem' }}
        >
          Planes
        </Typography>
          <Box sx={{ width: '100%' }}>
            <Grid sx={{ width: '100%', marginTop: '3em', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', px: '5%' }}>
              {data
                ? data.map((data) => (<SubscriptionsCard key={data._id} data={data} />))
                : null}
            </Grid>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  )
}

export default Subscriptions
