import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/login/Login'
import AboutServices from './pages/Home/AboutServices'
import Contact from './pages/Home/Contact'
import './normalize.css'

const App = () => {
  return (

    <>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/aboutServices' element={<AboutServices />} />
            <Route path='/contact' element={<Contact />} />
        </Routes>
    </>
  )
}

export default App
