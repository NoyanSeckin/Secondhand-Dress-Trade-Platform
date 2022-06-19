import React, { useState } from 'react';

import {Backdrop, Box, Button, Container, Fade, Modal, Typography} from '@mui/material'

import axios from 'axios'

import {styles} from './StylesOfferModal'
import CloseIcon  from '../../constants/icons/CloseIcon';
import ConfirmIcon from '../../constants/icons/ConfirmIcon';

export default function OfferModal({isOfferModal, setIsOfferModal, product, userAuth ,setOffer, setOfferError}) {
  const handleClose = () => setIsOfferModal(false);
  
  const [activeCheckbox, setActiveCheckbox] = useState(null);
  const [givenOffer, setGivenOffer] = useState('');

  function handleCheckbox(ratio){
    setGivenOffer((Number(product.price) * (ratio / 100)).toFixed(2));

    setActiveCheckbox(ratio);
  }

  function renderCheckboxes(){

    const ratios = [20, 30, 40];

    const ratioLetters = {
      20: 'si',
      30: 'u',
      40: 'ı',
    }
    
    return ratios.map((ratio, index) => {
      
        return(
        <Box key={index} 
        sx={{
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
           : <img src={'/images/ellipse-outline.png'} alt="small-ellipse" />} 
          </Box>
         <Typography sx={{
           color: activeCheckbox === ratio ? 'primary.main' : '#525252',
           fontSize: {xs: '15px', lg: '1rem'}
           }}>
           %{ratio}'{ratioLetters[ratio]} Kadar Teklif Ver
         </Typography>
        </Box>
      )
    })
  }
  function renderHeaderAndCloseIcon(){
    
    return(
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Typography sx={{
        fontSize: {xs: '18px', lg: '25px'}, 
        fontWeight: '700',
        }}>Teklif Ver</Typography>
      <div onClick={handleClose}><CloseIcon /></div>
    </Box>
    )
  }
  function renderNameImgAndPrice(image, price){
    return(
      <Box sx={{
        background: '#f0f8ff', 
        borderRadius: '10px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        p: {xs: 0.5, lg: 1},
        mb: {xs: 1, lg: 0}
        }}>
        <Box sx={{display: 'flex', width: '50%'}}>
          <img src={image} alt="" style={styles.img}/>
          <Typography sx={{
            ml: 1, 
            color: '#555555', 
            lineHeight: '20px',
            fontSize: {xs: '13px', lg: '16px'}
            }}>{product.name}</Typography>
        </Box>
        <Typography sx={{
          color: '#525252', 
          fontWeight: '700', 
          alignSelf: 'center',
          fontSize: {xs: '15px', lg: '1.125rem'}
          }} variant='h6'>{price} TL</Typography>
    </Box>
    )
  }
  function renderOfferInput(){
    return(
      <div className='offer-wrapper'>
       <input className='offer-input' type="number" placeholder='Teklif Belirle' value={givenOffer} onChange={(e)=> setGivenOffer(e.target.value)} />
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
          px: {xs: 17, lg: 16},
          mt: {xs: 1.5, lg: 0},
          mb: {xs: 1, lg: 0}
          }}>Onayla</Button>
     </Box>
    )
  }
  async function sendOffer(){
    const address = `https://bootcamp.akbolat.net/offers`
    await axios.post(address, {product: product.id, users_permissions_user: userAuth.id, offerPrice: Number(givenOffer)}, {
      headers: {
        Authorization: `Bearer ${userAuth.token}`,
      }, 
    }).then((response)=> {
      console.log(response.data)
      if(response.data.product.isOfferable){
        setOffer({id: response.data.id, price: response.data.offerPrice});
        console.log('set offer calisti');
      }else{
        setOfferError('Bu ürün teklif kabul etmiyor')
        console.log('else calisti');
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
          <Container sx={styles.container}>
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
