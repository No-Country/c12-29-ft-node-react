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

const App = () => {
  const user = localStorage.getItem('usuario')
  const userParse = JSON.parse(user)
  const userCredential = userParse?.accountType
  console.log("UC EN APP: ", userCredential)
  if (userParse) {
    const { data, isLoading, error } = useGetUserByIdQuery(userParse._id)
  }

  const theme = createTheme({
    typography: {
      fontFamily: [
        'KoHo'
      ].join(',')
    }
  })

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
