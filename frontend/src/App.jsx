import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/login/Login'
import Contact from './pages/Home/contact/Contact'
import './css/normalize.css'
import SignUp from './pages/SignUp/SignUp'
import { createTheme, ThemeProvider } from '@mui/material'
import ClientServices from './pages/ClientServices'
import LawyerPanel from './pages/LawyerPanel'
import { saveUser } from './redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/es'
import Subscriptions from './pages/Subscriptions'

const App = () => {
  const user = localStorage.getItem('usuario')
  const userParse = JSON.parse(user)
  const userCredential = userParse?.accountType
  const dispatch = useDispatch()
  const userAccountType = useSelector((state) => state.user.accountType)
  const userToken = useSelector(state => state.user.token)
  const navigate = useNavigate()
  
    useEffect( () => {
      if (userParse) {
        dispatch(saveUser({token:userParse?.token, accountType:userParse?.user?.accountType, user:userParse?.user}))
      }
    },[])

  const theme = createTheme({
    typography: {
      fontFamily: [
        'KoHo'
      ].join(',')
    }
  })

  const Services = () => {
        if (userAccountType === 'Client') return <ClientServices /> 
        if (userAccountType === 'Lawyer') {
          return <LawyerPanel /> 
        } else { navigate('/')} 
        // sin else, un usuario no logeado que intente entrar, le queda pantalla en blanco
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es" >
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/services' element={ <Services />} /> 
              <Route path='/*' element={<Home />} />
          </Routes>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  )
}

export default App
