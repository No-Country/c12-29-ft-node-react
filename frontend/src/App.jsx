import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/login/Login'
import AboutServices from './pages/Home/AboutServices'
import Contact from './pages/Home/contact/Contact'
import './css/normalize.css'
import SignUp from './pages/SignUp/SignUp'
import { createTheme, ThemeProvider } from '@mui/material'
import { useGetUserByIdQuery } from './redux/userReducer'

const App = () => {
  const user = localStorage.getItem('usuario')
  const userParse = JSON.parse(user)

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
            <Route path='/aboutServices' element={<AboutServices />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/signup' element={<SignUp />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
