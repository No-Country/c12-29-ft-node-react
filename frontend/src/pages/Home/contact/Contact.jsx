import Input from '@mui/material/Input'
import Container from '@mui/material/Container'
import { Box, Typography, Button } from '@mui/material'
import { styled } from '@mui/system'
import emailjs from '@emailjs/browser'
import { useRef, useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import './contact.styles.css'

const Contact = () => {
  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [message, setMessage] = useState('')
  const [messageValid, setMessageValid] = useState(false)
  const [sendPressed, setSendPressed] = useState(false)
  const PUBLIC_KEY = 'hQY66H5L11sMHfOBE'
  const SERVICE_ID = 'c1229abogados'
  const TEMPLATE_ID = 'template_3asf2gm'
  const form = useRef()
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const validateEmail = (e) => {
    setEmail(e.target.value)
    if (e.target.value.match(EMAIL_REGEX)) {
      setEmailValid(true)
      console.log("form valido ")
    } else { 
      setEmailValid(false) 
      console.log("form invalido, formValid: ", emailValid)
    }
  }

  const validateMessage = (e) => {
    console.log("en validateMessage")
    console.log("value: ", e.target.value)
    setMessage(e.target.value)
    if (e.target.value) {
      setMessageValid(true)
    }
  }

  const sendEmail = (e) => {
    setSendPressed(true)
    e.preventDefault()
    if (emailValid && messageValid) {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
        .then((result) => {
          if (result.status === 200){
            e.target.message.value = ''
            e.target.user_email.value = ''
          }
        })
        .catch( error => {
          console.log(error.text)
        })
    }
  }

  const ContactButton = styled(Button)(() => ({
    color: 'white',
    backgroundColor: 'black',
    boxShadow: '0px 4px 4px 0px #00000040',
    borderRadius: '4px',
    width: '228px',
    height: '45px',
    '&:hover': {
      backgroundColor: '#212f3d '
    }
  }))

  return (
    <Container ref={form} as='section' maxWidth='false' sx={{ background: '#E7E7E7', width: '100%', mx:0, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Box sx={{width: '36%', padding: '6em 0 6em 0' }} >
        <Typography variant="h2" gutterBottom sx={{ fontSize: '1.125em', lineHeight: '1.3em', fontStyle: 'italic', fontWeight: '500', color: '#3D3D3D', fontFamily: 'sans-serif' }}>contact us for more information</Typography>
        <Box
          component= 'form'
          onSubmit={ (e) => sendEmail(e) }
          ref={form}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }} >
          <Box sx={{ width: '100%', border: ' none' }}>
            <OutlinedInput 
              type="email" 
              name="user_email" 
              sx={{ borderRadius: '4px', width:'100%', margin: '2em 0 0em 0', padding: '0.5em'}} 
              placeholder='email...'  
              value={email}
              onChange={validateEmail}
              error={Boolean((!emailValid & sendPressed))}
              className='contactEmail'
            />
          { !emailValid && sendPressed?
            <Typography sx={{ color: 'red', marginBottom: '1em'}}>
              Debe ingresar un email válido
            </Typography> 
            : 
            <Typography sx={{ visibility: 'hidden', marginBottom: '1em'}}>espacio</Typography>
          }
          </Box>
          <textarea
            value={message} 
            onChange={(e) =>validateMessage(e)} 
            aria-label="minimum height" 
            rows={8} 
            placeholder="message..." 
            type='text' 
            name="message" 
            className='contactTextarea'
          />
          { !messageValid && sendPressed?
            <Typography sx={{ color: 'red', marginBottom: '1em'}}>
              Debe ingresar un mensaje
            </Typography> 
            : 
            <Typography sx={{ visibility: 'hidden', marginBottom: '1em'}}>espacio</Typography>
          }
          <ContactButton type="submit" variant="contained" size="small"value="Send">Send</ContactButton>
        </Box>
      </Box>
    </Container>
  )
}

export default Contact
