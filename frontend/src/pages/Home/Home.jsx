import Hero from "./Hero"
import Contact from "./Contact"
import AboutServices from "./AboutServices"
import { Button } from '@mui/material'
import { NavLink } from "react-router-dom"
import Footer from "./Footer"

const Home = () => {

  console.log(Button, 'asdasd');

  return (
    <div>
      <Hero />
      <AboutServices />
      <Contact />
      <Footer />
      <NavLink to='/login'><Button>login</Button></NavLink>
      <NavLink to='/signup'><Button>Sign Up</Button></NavLink>
    </div>
  )
}

export default Home