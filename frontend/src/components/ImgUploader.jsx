import { Avatar, Box } from '@mui/material';
import React, { useEffect, useState } from 'react'

const ImgUploader = () => {
  const [image, setImage ] = useState("")
  const [ url, setUrl ] = useState("");
  const [urlOnServer, setUrlOnServer] = useState("")
  useEffect( () => {
    let imgURL = image !==""? URL.createObjectURL(image) : ""
    console.log("imgURL: ", imgURL)
    setUrl(imgURL)
  },[image])

  const uploadImage = () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "dewbhyeda")
    data.append("cloud_name","dewbhyeda")
    fetch("  https://api.cloudinary.com/v1_1/dewbhyeda/upload",{
      method:"post",
      body: data
    })
    .then(resp => resp.json())
    .then(data => {
      setUrlOnServer(data.url)
      
    })
    .catch(err => console.log(err))
  }

  console.log("URL: ", url)
  console.log("image: ", image)
  return (
    <Box sx={{ width: '100%', color: ' white'}}>
      <div>
        <input type="file" onChange= {(e)=> setImage(e.target.files[0])}></input>
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div>
        <h1>Suba su foto, debe ser cuadrada</h1>
        <img src={url} style={{ width: '300px', height: 'auto', aspectRatio: "1/1" }} />
      </div>
    </Box>
    )
}
    export default ImgUploader;