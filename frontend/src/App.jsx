import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/login/Login"


const App = () => {
  return (

    <>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    </>
  )
}

export default App