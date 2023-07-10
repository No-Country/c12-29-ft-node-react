import Hero from './Hero'
import Contact from './contact/Contact'
import AboutServices from './AboutServices'
import Footer from './Footer'
import Navbar from '../../components/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <AboutServices />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home
