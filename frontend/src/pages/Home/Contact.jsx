import Input from '@mui/material/Input';
import Container from '@mui/material/Container';
import { Box, FormControl, TextareaAutosize, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import CustomTextarea from '../../components/CustomTextarea';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';


const Contact = () => {

  const PUBLIC_KEY= 'hQY66H5L11sMHfOBE'
  const SERVICE_ID = 'c1229abogados'
  const TEMPLATE_ID = 'template_3asf2gm'
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };


  return (
    <Container  style={{width:'30%'}}>
      <Typography variant="h2" gutterBottom sx={{fontSize:'1.5em', lineHeight:'1.6em'}}>Contacto</Typography>
      <Box 
        component='form' 
        onSubmit={(e)=>sendEmail(e)} 
        ref={form} 
        style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}} >
        <Box>
          <Input sx={{marginBottom:'1em'}} placeholder="name" type="name" name="user_name"  />
          <Input sx={{marginBottom:'1em'}} placeholder="email" type="email" name="user_email"  />
          <Input name='message' />
        </Box>
        <CustomTextarea type='text' name="message2" placeholder="Deje su mensaje..."/>
        <Button type="submit" variant="contained"  size="small"value="Send">Enviar</Button>
      </Box>
    </Container>
  )
}

export default Contact
