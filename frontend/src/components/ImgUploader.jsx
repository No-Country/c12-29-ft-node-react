import { Avatar, Box, Button, Input, InputLabel, Typography, styled } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useUpdateLawyerImageMutation } from '../redux/userReducer';
import Swal from 'sweetalert2';

const ImgUploader = () => {
  const [image, setImage ] = useState("")
  const [ url, setUrl ] = useState("");
  const [load, setLoad] = useState(false)
  const lawyer = useSelector( state => state.user)
  const lawyerId = useSelector( state => state.user.user._id)
  const refSuccess = useRef(false)

  const [ updateLawyerImage, { data, error, isSuccess}] = useUpdateLawyerImageMutation({
    fixedCacheKey: 'image-uploading',
  })

  useEffect( () => {
    let imgURL = image !==""? URL.createObjectURL(image) : ""
    setUrl(imgURL)
  },[image])
  
 /*  const handleSetImg = (e) => {
    console.log("e: ", e)
    const img = e.target.files[0]
    img.id = lawyerId
    setImage(img)
    console.log("img ", img)
  } */
  const handleError = () => {
    Swal.fire({
      title: 'Error en la carga',
      icon: 'error',
      denyButtonText: 'cerrar',
      timer: 3000
    })
  }
  const handleSucces = () => {
    Swal.fire({
      title: 'Carga exitosa',
      icon: 'success',
      denyButtonText: 'cerrar',
      timer: 3000
    })
  }
 /*  useEffect(() => {
    if (isSuccess) {
      handleSucces()
      console.log("IS SUCCESS")
    }
  },[isSuccess])

  useEffect( () => {
    if (error) {
      handleError()
    }
  },[error]) */

  const uploadImage = (e) => {
    e.preventDefault()

      /*  */
      // CON FETCH
      // try {
      //   const formData = new FormData()
      //   formData.append('image', image)
      //   /* formData.append("imageId", lawyerId) */
      //   const sendImg = await fetch( `https://c12-29-ft-node-react.onrender.com/api/lawyers/image/${lawyerId}`,
      //   /* const sendImg = await fetch(`http://localhost:3001/api/lawyers/image/${lawyerId}`, */
      //   { 
      //     method: 'PUT',
      //     body: formData,
      //   })
      // } catch (error) {
      //   console.log(error.message)
      // }

      /////////////////////////////////////////////////
      // CON AXIOS
      // const formData = new FormData()
      // formData.append('image', image)
      // try{
      //   const response = await axios.put( `https://c12-29-ft-node-react.onrender.com/api/lawyers/image/${lawyerId}`, formData, {
      //       headers: {
      //         'Content-Type': 'multipart/form-data'
      //       }  
      //     }
      //   )
      //   console.log("response: ", response)

      // }catch(error) {
      //     handleError()
      //     console.log("ERROR: ", error)
      // }/* finally{

      // } */
      //try{

      //}catch(error){
        //console.log(error)
      //}
      /////////////////////////////////////
      // CON RTK QUERY
      
      if (image) {
          const formData = new FormData()
          formData.append('image', image)
          const dataquery = {
            lawyerId, 
            formData
          }
          console.log("loading adentro", load)
          updateLawyerImage(dataquery).unwrap()
          .then(setLoad(prev => !prev))
          .then( res => {
            console.log(res)  
            handleSucces() 
          })
          .catch( () => handleError())
          /* .finally( setLoad(false)) */
          console.log("DATA: ", data)
          /* return {isLoading, isSuccess, error} */     
      }
    }
    console.log("loading afuera", load)


  return (
    <Box sx={{ width: '100%', color: ' white', fontFamily:'koho', paddingBottom:'3em'}}>
      <div style={{ textAlign: 'center'}}>
        <img src={url} style={{ width: '300px',maxWidth:'80%', height: 'auto', aspectRatio: "1/1", background: 'white' }} />
      </div>
      <form action="" onSubmit={uploadImage} style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', px:'30%', marginTop:'1em'}}>
        <InputLabel htmlFor='file' 
          sx={{ display:'block', width:'200px', maxWidth:'40%', margin:'0 1em 0 0', borderRadius:'4px', boxShadow:'none', '&:hover':{background: '#FAFF00', boxShadow: '2'/* '1px 1px 0px 2px rgba(0,0,0,0.35)' */} }}
        >
        <Input 
          sx={{ display: "none", width:'99%', borderRadius:'4px', boxShadow:'none', '&:hover':{boxShadow:'none'} }}
            type="file" 
            onChange= {/* handleSetImg */(e) => setImage(e.target.files[0])} 
            name='file' 
            id='file'
            accept='.png,.jpg,.jpeg' 
        />
        <Button 
          sx={{
            width:'100%',
            background:'#FAFF00', 
            color:'black', 
            '&:hover':{background: '#FAFF00'},
            '& .Mui-focusVisible':{background:'#FAFF00'},
            textAlign:'center',
            fontSize:'1.1em',
            lineHeight:'1.2em',
            padding:'6px 4px 6px 4px',
            borderRadius:'4px'
          }} 
          variant="contained" 
          component="span"
        >
          Seleccionar 
        </Button>
        </InputLabel>
        <Button 
          sx={{
            width:'200px',
            maxWidth:'40%',
            background:'#FAFF00', 
            color:'black', 
            borderRadius:'4px', 
            '&:hover':{background:'#FAFF00' , boxShadow: '2' },
            '& .Mui-focusVisible':{background:'#FAFF00'},
            textAlign:'center',
            fontSize:'1.1em',
            lineHeight:'1.2em',
            padding:'6px 4px 6px 4px',
            margin: '0 0 0 1em',
            boxShadow:'none'
          }}   
          type='submit' 
          variant="contained"  
        >
          Cargar
        </Button>
      </form>
      {
        load?
        <Typography sx={{fontSize:'1.5em', color:'green'}}>Cargando...</Typography>
        :
        null
      }
    </Box>
    )
}
    export default ImgUploader;