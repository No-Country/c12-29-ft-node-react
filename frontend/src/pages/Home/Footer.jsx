import { Avatar, Box, Typography } from "@mui/material"
import blackHammer from '../../assets/martilloGris.svg'
import topImg from '../../assets/footer.jpg'

const Footer = () => {
  return (
    <Box as='section'  >
      <Avatar src={topImg} sx={{width: '100%', height: 'auto', borderRadius: '0'}}/>
      <Box 
        sx={{
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          py: '3em',
          background: '#E7E7E7',
          gap: '0',
          boxSizing: 'border-box'
          }}
        >
        <img src={blackHammer} />
        <Typography as='h2' sx={{margin: '1em 0 1em 0'}}>Abogados  <Typography as='span' sx={{color: 'grey'}}>| servicios legales | 2023</Typography></Typography>
      </Box>
    </Box>
  )
}

export default Footer