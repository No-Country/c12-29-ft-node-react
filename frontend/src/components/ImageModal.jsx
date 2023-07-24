import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImgUploader from './ImgUploader';
import { useUpdateLawyerImageMutation } from '../redux/userReducer';
import Zoom from '@mui/material/Zoom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

export default function ImageModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ updateLawyerImage, { data, error, isSuccess, isLoading}] = useUpdateLawyerImageMutation({
    fixedCacheKey: 'image-uploading',
  })
  useEffect( () => {
    isSuccess||error? handleClose() : null
  },[isSuccess, error])

  return (
    <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center', my:'3em', borderRadius:'4px'}}>
      <Typography variant="h1" sx={{fontSize:'1.5em', color:'white', marginBottom:'1em'}}>Subir foto, debe ser cuadrada</Typography>
      <Button 
        onClick={handleOpen} 
        variant='contained'
        sx={{
          background:'#FAFF00', 
        color:'black', 
        '&:hover':{background: '#cbda16', boxShadow:'5',   }
        }}
      >
        Abrir
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{'& .css-1wnsr1i':{ borderRadius:'4px'} }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <ImgUploader />
            {/* {
              isLoading?
              <>
                <Zoom>
                <Typography sx={{fontSize:'1.5em', color:'green'}} >Cargando...</Typography>

                </Zoom>
              </>
              :
              null
            } */}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}