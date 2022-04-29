import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Container, Paper} from '@mui/material'
import CloseIcon  from '../constants/icons/CloseIcon';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '480px',
  height: '461px',
  bgcolor: '#fff',
  borderRadius: '10px',
  boxShadow: '0px 3px 12px #1E36482E',
  padding: '1.5rem 0'
};

export default function OfferModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function renderCheckboxes(){
    const ratios = [20, 30, 40];
    return ratios.map(ratio => {
      return(
        
      )
    })
  }
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style:{opacity: 0.7, background: '#4B9CE2'}
        }}
      >
        <Fade in={open}>
          <Container sx={style}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography sx={{fontSize: '25px', fontWeight: '700'}}>Teklif Ver</Typography>
              <div onClick={handleClose}><CloseIcon /></div>
            </Box>
            <Box sx={{background: '#f0f8ff', display: 'flex', justifyContent: 'space-between', borderRadius: '10px', p: 1}}>
              <Box sx={{display: 'flex', width: '50%'}}>
                <img src={require('../images/detail-image-0.png')} alt=""
                style={{width: '50px', height: '50px', borderRadius: '8px'}} />
                <Typography sx={{ml: 1, color: '#555555', lineHeight: '20px'}}>Beli Uzun Trenckot Kareli</Typography>
              </Box>
              <Typography sx={{color: '#525252', fontWeight: '700', alignSelf: 'center'}} variant='h6'>319,90 TL</Typography>
            </Box>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
}
