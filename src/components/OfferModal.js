import React, { useState } from 'react';
import {Backdrop, Box, Button, Container, Fade, Modal, Typography} from '@mui/material'
import axios from 'axios'

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
export default function OfferModal({isOfferModal, setIsOfferModal, product, userAuth ,setLocalOffer, setOfferError}) {
  const handleClose = () => setIsOfferModal(false);
  
  const [activeCheckbox, setActiveCheckbox] = useState(null);
  const [offer, setOffer] = useState('')
  function handleCheckbox(ratio){
    setOffer((Number(product.price) * (ratio / 100)).toFixed(2));
    setActiveCheckbox(ratio);
  }

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
          onClick={()=> handleCheckbox(ratio)}>
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
  function renderNameImgAndPrice(image, price){
    return(
      <Box sx={{background: '#f0f8ff', display: 'flex', justifyContent: 'space-between', borderRadius: '10px', p: 1}}>
      <Box sx={{display: 'flex', width: '50%'}}>
        <img src={image} alt=""
        style={{width: '50px', height: '50px', borderRadius: '8px'}} />
        <Typography sx={{ml: 1, color: '#555555', lineHeight: '20px'}}>{product.name}</Typography>
      </Box>
      <Typography sx={{color: '#525252', fontWeight: '700', alignSelf: 'center'}} variant='h6'>{price} TL</Typography>
    </Box>
    )
  }
  function renderOfferInput(){
    return(
      <div className='offer-wrapper'>
       <input type="number" placeholder='Teklif Belirle' className='offer-input' value={offer} onChange={(e)=> setOffer(e.target.value)} />
      </div>
    )
  }
  function renderConfirmBtn(){
    return(
      <Box sx={{mx: 'auto'}}>
        <Button variant='contained' 
        onClick={sendOffer}
        sx={{
          color: '#fff', 
          borderRadius: '8px',
          fontSize: '18px',
          px: 15
          }}>Onayla</Button>
     </Box>
    )
  }
  async function sendOffer(){
    const address = `https://bootcamp.akbolat.net/offers`
    await axios.post(address, {product: product.id, users_permissions_user: userAuth.id, offerPrice: Number(offer)}, {
      headers: {
        Authorization: `Bearer ${userAuth.token}`,
      }, 
    }).then((response)=> {
      if(response.data.product.isOfferable){
        setLocalOffer(response.data.offerPrice);
        setOfferError('')
      }else{
        setOfferError('Bu ürün teklif kabul etmiyor')
        setLocalOffer(1);
      }
    }).catch((err)=> console.log(err.message))
    
    handleClose();
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
            {renderNameImgAndPrice(`https://bootcamp.akbolat.net${product.image?.url}`, product.price)}
            {renderCheckboxes()}
            {renderOfferInput()}
            {renderConfirmBtn()}
          </Container>
        </Fade>
      </Modal>
    </div>
  );
}
