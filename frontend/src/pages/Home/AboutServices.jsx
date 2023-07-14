import { Typography } from '@mui/material'
import aboutImg from '../../assets/aboutImg.jpg'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
const AboutServices = () => {
  return (
    <Box as='section' sx={{background: '#E7E7E7'}} >
      <Box sx={{px: '10%', py: '10em' , mx: '3em'}}>
        <Typography as='h2' sx={{fontSize: '2em'}} >Acerca de nosotros</Typography>
        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Curabitur eu suscipit tortor. Vivamus blandit, libero vitae rutrum tristique, 
          enim orci lacinia ante, non bibendum felis nunc sed nisi. Nulla egestas dapibus sodales. 
          Duis sed ipsum ut justo pellentesque pellentesque. Vivamus sed convallis leo, 
          commodo suscipit leo. Donec vitae urna purus. Fusce elementum tincidunt diam, 
          sit amet rhoncus metus viverra sit amet. 
          Pellentesque aliquet elit mauris, ut pretium purus tempus sed.
        </Typography>
      </Box>
      <Avatar 
        src={aboutImg} 
        sx={{
          width: '100%', 
          height: 'auto' , 
          borderRadius: '0' , 
          background: 'black',
          '&:after' : {background: 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5))' }
        }} 
      />
    </Box>
  )
}

export default AboutServices
