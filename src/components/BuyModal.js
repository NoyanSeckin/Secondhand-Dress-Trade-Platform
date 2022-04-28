import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '355px',
  height: '171px',
  bgcolor: '#fff',
  borderRadius: '8px',
  boxShadow: '0px 3px 12px #1E36482E',
  textAlign: 'center',
  zIndex: 33,
  opacity: 1,
  
};

export default function BuyModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        sx={{opacity: '0.7'}}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        disableAutoFocus
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5" sx={{fontWeight: '700', fontSize: '25px', mt: 1.5}}>
              Satın AI
            </Typography>
            <Typography id="transition-modal-description" sx={{ my: 2, color: '#555555' }}>
             Satın AImak istiyor musunuz?
            </Typography>
            <Button sx={{color: 'primary', background: '#f0f8ff', fontSize: '18px', fontWeight: '700', borderRadius: '8px', px: 5, mr: 1}}>Vazgeç</Button>
            <Button sx={{color: '#fff', background: '#4B9CE2', fontWeight: 700, fontSize: '18px', borderRadius: '8px', px: 5,'&:hover': {background: '#4B9CE2'}}}>Satın AI</Button>
          </Box> 
        </Fade>
      </Modal>
    </Box>
  );
}