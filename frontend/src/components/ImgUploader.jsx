import { Avatar, Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'
/* import { useUpdateLawyerImageMutation } from '../redux/userReducer'; */

const ImgUploader = () => {
  const [image, setImage ] = useState("")
  const [ url, setUrl ] = useState("");
  const [urlOnServer, setUrlOnServer] = useState("")
  const lawyer = useSelector( state => state.user)
  const lawyerId = useSelector( state => state.user.user._id)
  console.log("lawyerId en ImgUploader: ", lawyerId)

/*   const [ updateLawyerImage, { data}] = useUpdateLawyerImageMutation() */

  useEffect( () => {
    let imgURL = image !==""? URL.createObjectURL(image) : ""
    console.log("imgURL: ", imgURL)
    setUrl(imgURL)
  },[image])
  
  console.log("image: ", image)
  
  const handleSetImg = (e) => {
    console.log("e: ", e)
    const img = e.target.files[0]
    img.id = lawyerId
    setImage(img)
    console.log("URL: ", url)
  }

  

  const uploadImage = async (e) => {
    e.preventDefault()
    try {
      const dataForm = new FormData()
      console.log("DATAFORM: ", dataForm)
      dataForm.append('image', image)
      dataForm.append("imageId", lawyerId)
      const sendImg = await fetch( `https://c12-29-ft-node-react.onrender.com/api/lawyers/image/${lawyerId}`,
      /* const sendImg = await fetch(`http://localhost:3001/api/lawyers/image/${lawyerId}`, */
      {
        method: 'PUT',
        body: dataForm,
        headers: {
          'Content-Type': 'multipart/form-data'
        },   
      })
      /* 'Content-Disposition': 'form-data; name="name"', */
       /* 'Content-Disposition': `form-data; name="file"; filename= ${image.name}`, */
    }catch (error) {
      console.log(error.message)
    } 


      /* fetch(`http://localhost:3001/api/lawyers/${lawyerId}`,{method:'GET'})
      .then( res => res.json())
      .then( data => console.log( data))
      .catch(err => console.log( err.message)) */
    
    /* console.log("form: ", data) */
   /*  setImage(data) */
    
    /*fetch("  https://api.cloudinary.com/v1_1/dewbhyeda/upload",{
      method:"post",
      body: data
    })
    .then(resp => resp.json())
    .then(data => {
      setUrlOnServer(data.url)
      
    })
    .catch(err => console.log(err)) */
  }
 

  return (
    <Box sx={{ width: '100%', color: ' white'}}>
      <div>
        <input type="file" onChange= {handleSetImg/* (e)=> setImage(e.target.files[0]) */} name='image' accept='.jpg' />
        <button style={{ marginLeft: '2em'}} type='submit' onClick={uploadImage}>Upload</button>
      </div>
      <div style={{ textAlign: 'center'}}>
        <h1>Suba su foto, debe ser cuadrada</h1>
        <img src={url} style={{ width: '300px', height: 'auto', aspectRatio: "1/1", background: 'white' }} />
      </div>
      {image? 
        <div>
          <p>hay img</p>
          {image.id}
        </div>  
        : 
        null
      }
    </Box>
    )
}
    export default ImgUploader;