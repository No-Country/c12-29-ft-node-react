import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/login/Login'
import AboutServices from './pages/Home/AboutServices'
import Contact from './pages/Home/contact/Contact'
import './normalize.css'
import SignUp from './pages/SignUp/SignUp'

const App = () => {
  return (

    <>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/aboutServices' element={<AboutServices />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/signup' element={<SignUp />} />
        </Routes>
    </>
  )
}

export default App
