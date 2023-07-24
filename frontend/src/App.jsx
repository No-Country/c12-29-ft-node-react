import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/login/Login'
import Contact from './pages/Home/contact/Contact'
import './css/normalize.css'
import SignUp from './pages/SignUp/SignUp'
import { createTheme, ThemeProvider } from '@mui/material'
import { useGetUserByIdQuery } from './redux/userReducer'
import ClientServices from './pages/ClientServices'
import LawyerPanel from './pages/LawyerPanel'
import { saveUser } from './redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const App = () => {
  const user = localStorage.getItem('usuario')
  const userParse = JSON.parse(user)
  const userCredential = userParse?.accountType
  const dispatch = useDispatch()
  const userAccountType = useSelector( (state) => state.user.accountType)
  const userToken = useSelector( state => state.user.token)
  const navigate = useNavigate()
  
   /*  if (userParse) {
      const { data, isLoading, error } = useGetUserByIdQuery(userParse._id)
      // console.log("data de useQuery en APP", data)  undefines, tiene scope de bloque
      // Lo reemplazo con un slice para el user, en principio toma manualmente el estado del LS,
      // con tiempo se puede conectar un middleware que tome el estado inicial del LS
    }  */
    
  if (userParse) {
    /* dispatch(saveUser({token:userParse?.token, accountType:userParse?.user?.accountType})) */
    dispatch(saveUser({token:userParse?.token, accountType:userParse?.user?.accountType, user:userParse?.user}))
  }
  

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
        // sin el else, un usuario no logeado que intente entrar, le queda pantalla en blanco
  }
  
/* useEffect( () => {
  fetch('https://c12-29-ft-node-react.onrender.com/api/clients')
  .then(res => res.json())
  .then( data => { console.log("data en getclients: ", data)
  })
  .catch( error => console.log(error.message))
}) */

  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/services' element={ <Services />} /> 
            {/* <Route path='/services' element={  (userCredential==='Client')? <Services /> : <Navigate replace to={'/lawyerpanel'} /> } /> 
            <Route path='/lawyerpanel' element={<LawyerPanel />} /> */}
            <Route path='/*' element={<Home />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
