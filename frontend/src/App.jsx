import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/login/Login'
import AboutServices from './pages/Home/AboutServices'
import Contact from './pages/Home/contact/Contact'
import './css/normalize.css'
import SignUp from './pages/SignUp/SignUp'
import { createTheme, ThemeProvider } from '@mui/material'
import { useGetUserByIdQuery } from './redux/userReducer'
import { useGetLawyersQuery } from './redux/userReducer'
import { useGetUserMutation } from './redux/userReducer'
import Services from './pages/services'
import LawyerPanel from './pages/LawyerPanel'
import { saveUser } from './redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const user = localStorage.getItem('usuario')
  const userParse = JSON.parse(user)
  const userCredential = userParse?.accountType
  const dispatch = useDispatch()
  /* const userToken = useSelector( state => state.user.token) */
 /*  const useraccountType = useSelector( state => state.user.AccountType) */
  console.log("UC EN APP: ", userCredential)
  console.log("userParse en App: ", userParse)
  if (userParse) {
    const { data, isLoading, error } = useGetUserByIdQuery(userParse._id)
    dispatch(saveUser(userParse.token/* ,userParse.accountType */))
  }
  console.log("user en App: ", user)
  const theme = createTheme({
    typography: {
      fontFamily: [
        'KoHo'
      ].join(',')
    }
  })

  /* const Serveces = () => {

  } */

  return (

    <>
      <ThemeProvider theme={theme}>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/services' element={  (userCredential==='Client')? <Services /> : <Navigate replace to={'/lawyerpanel'} /> } /> 
            <Route path='/lawyerpanel' element={<LawyerPanel />} />
            <Route path='/*' element={<Home />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
