import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Container, Paper} from '@mui/material'
import CloseIcon  from '../constants/icons/CloseIcon';
import ConfirmIcon from '../constants/icons/ConfirmIcon';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '480px',
  bgcolor: '#fff',
  borderRadius: '10px',
  boxShadow: '0px 3px 12px #1E36482E',
  padding: '1.5rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};
export default function OfferModal({isOfferModal, setIsOfferModal}) {
  // const [open, setOpen] = React.useState(true);
  const handleOpen = () => setIsOfferModal(true);
  const handleClose = () => setIsOfferModal(false);

  const [activeCheckbox, setActiveCheckbox] = useState(null);
  function renderCheckboxes(){
    const ratios = [20, 30, 40];
    const ratioLetters = {
      20: 'si',
      30: 'u',
      40: 'ı',
    }
    return ratios.map(ratio => {
      return(
        <Box sx={{
          border: '1px solid #E0E0E0',
          borderRadius: '8px',
          height: '45px',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          '&:hover': {cursor: 'pointer'}
          }} 
          onClick={()=> setActiveCheckbox(ratio)}>
          <Box sx={{ml: 1}}>
           {activeCheckbox === ratio ? <ConfirmIcon/> 
           : <img src={require('../images/ellipse-outline.png')} alt="small-ellipse" />} 
          </Box>
         <Typography sx={{color: activeCheckbox === ratio ? 'primary.main' : '#525252'}}>
           %{ratio}'{ratioLetters[ratio]} Kadar Teklif Ver
         </Typography>
        </Box>
      )
    })
  }
  function renderHeaderAndCloseIcon(){
    return(
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Typography sx={{fontSize: '25px', fontWeight: '700'}}>Teklif Ver</Typography>
      <div onClick={handleClose}><CloseIcon /></div>
    </Box>
    )
  }
  function renderImgAndPrice(){
    return(
      <Box sx={{background: '#f0f8ff', display: 'flex', justifyContent: 'space-between', borderRadius: '10px', p: 1}}>
      <Box sx={{display: 'flex', width: '50%'}}>
        <img src={require('../images/detail-image-0.png')} alt=""
        style={{width: '50px', height: '50px', borderRadius: '8px'}} />
        <Typography sx={{ml: 1, color: '#555555', lineHeight: '20px'}}>Beli Uzun Trenckot Kareli</Typography>
      </Box>
      <Typography sx={{color: '#525252', fontWeight: '700', alignSelf: 'center'}} variant='h6'>319,90 TL</Typography>
    </Box>
    )
  }
  function renderOfferInput(){
    return(
      <div className='offer-wrapper'>
       <input type="number" placeholder='Teklif Belirle' className='offer-input' />
    </div>
    )
  }
  function renderConfirmBtn(){
    return(
      <Box sx={{mx: 'auto'}}>
        <Button variant='contained' 
        sx={{
          color: '#fff', 
          borderRadius: '8px',
          fontSize: '18px',
          px: 15
          }}>Onayla</Button>
     </Box>
    )
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOfferModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style:{opacity: 0.7, background: '#4B9CE2'}
        }}
      >
        <Fade in={isOfferModal}>
          <Container sx={style}>
            {renderHeaderAndCloseIcon()}
            {renderImgAndPrice()}
            {renderCheckboxes()}
            {renderOfferInput()}
            {renderConfirmBtn()}
          </Container>
        </Fade>
      </Modal>
    </div>
  );
}
