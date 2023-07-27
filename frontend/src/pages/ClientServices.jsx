import React, { useEffect, useState } from 'react'
import servicesBg from '../assets/servicesBack.jpg'
import { Box, Button, Container, Grid } from '@mui/material'
import NavBar from '../components/Navbar'
import ServicesCard from '../components/ServicesCard'
import { useGetLawyersQuery } from '../redux/userReducer'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import Filter from '../components/Filter'
import Footer from './Home/Footer'
import MeetsDialog from '../components/MeetsDialog'
import CircularProgress from '@mui/material/CircularProgress'

const ClientServices = () => {
  const { data, isLoading, isSuccess, isError } = useGetLawyersQuery()

  const navigate = useNavigate()
  const dataInLocalStorage = localStorage.getItem('usuario')
  const userCredentials = dataInLocalStorage ? JSON.parse(dataInLocalStorage) : null
  if (userCredentials) console.log('userType: ', userCredentials)

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
  /// ///////////////////////////
  /* useEffect( () => {
  const handleFetch = () => {
    fetch(`https://c12-29-ft-node-react.onrender.com/api/meets/64af5cf18c8463b543fd00cd?isClient=true`)
      .then(res => res.json())
      .then( data => console.log(data))
      .catch(err => console.log( err.message))
  }
  handleFetch()
  console.log("en useEffect")
},[]) */

  return (
    <>
    {
      userCredentials
        ? <Box sx={{ position: 'relative', zIndex: '0', background: 'black', backgroundImage: `Url(${servicesBg})`, backgroundRepeat: 'repeat', backgroundSize: 'cover', minHeight: '100vh' }} >
        <Box sx={{ zIndex: '1' }}>
        <NavBar sx={{ width: '100%' }} />
        <Container maxWidth="md" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 20 }}>
          <SearchBar setSearchQuery={setSearchQuery} />
          <Filter specialty={specialty} setSpecialty={setSpecialty} />
          <MeetsDialog />
        </Container>
        <Grid container sx={{ marginTop: '3em', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'start', alignItems: 'center', px: '5%' }}>
          <>
          {
            isLoading
              ? <CircularProgress sx={{ color: 'white' }} />
              : null
          }
          {
            filteredData?.length
              ? filteredData.map((item) => (<ServicesCard key={item._id} item={item} />))
              : null
          }
          </>
        </Grid>
        </Box>
        <Footer />
      </Box>
        : null
      }
    </>
  )
}

export default ClientServices
