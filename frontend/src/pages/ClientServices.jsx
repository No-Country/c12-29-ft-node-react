import React, { useEffect, useState } from 'react'
import servicesBg from '../assets/servicesBack.jpg'
import { Box, Container, Grid } from '@mui/material'
import NavBar from '../components/Navbar'
import ServicesCard from '../components/ServicesCard'
/* import { useGetUserByIdQuery } from '../redux/userReducer' */
import { useGetLawyersQuery } from '../redux/userReducer'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import Filter from '../components/Filter'

const ClientServices = () => {
  const { data, isLoading, isSuccess, isError } = useGetLawyersQuery()
  const navigate = useNavigate()
  const dataInLocalStorage = localStorage.getItem('usuario')
  const userCredentials = dataInLocalStorage ? JSON.parse(dataInLocalStorage) : null
  if (userCredentials) console.log('userType: ', userCredentials)
  // NOTA: se puede chequear credencales del localStorage, o de redux, pero si no se sincroniza el estado inicial de redux con el LS, cuando se entra a la app por una vista que no es el home, puedehaber error

  const filterData = (query, data, type) => {
    if (type === 'search') {
      if (!query) {
        return data
      } else {
        return data.filter((d) => d.firstname.toLowerCase().includes(query))
      }
    } else {
      if (!query) {
        return data
      } else {
        return data.filter((d) => d.specialities.includes(query))
      }
    }
  }
  const [specialty, setSpecialty] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const searchedData = filterData(searchQuery, data, 'search')
  const filteredData = filterData(specialty, searchedData)

  useEffect(() => {
    if (!userCredentials) {
      console.log('EN UseEffect')
      navigate('/')
    }
  }, [])

  return (
    <>
    {
      userCredentials
        ? <Box sx={{ position: 'relative', zIndex: '0', background: 'black', backgroundImage: `Url(${servicesBg})`, backgroundRepeat: 'repeat', backgroundSize: 'cover', minHeight: '100vh' }} /* sx={{ minHeight: '200vh' ,backgroundImage: `Url(${servicesBg})`, backgroundRepeat:"no-repeat", backgroundSize: 'cover'}} */>
        {/* <Avatar src={servicesBg} sx = {{borderRadius: '0', width: '100%', height: 'auto', zIndex: -1, position: 'absolute'}} /> */}
        <Box sx={{ zIndex: '1' }}>
        <NavBar sx={{ width: '100%' }} />
        <Container maxWidth="md" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 20 }}>
          <SearchBar setSearchQuery={setSearchQuery} />
          <Filter specialty={specialty} setSpecialty={setSpecialty} />
        </Container>
        <Grid container sx={{ marginTop: '3em', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'start', alignItems: 'center', px: '5%' }}>
          {
            filteredData?.length
              ? filteredData.map((item) => (<ServicesCard key={item._id} item={item} />))
              : null
          }
        </Grid>
          {/* <Box sx={{height: '50em', color: 'white'}}> hola</Box> */}
        </Box>
      </Box>
        : null
    }
    </>
  )
}

export default ClientServices
