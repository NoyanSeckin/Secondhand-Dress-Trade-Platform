import * as React from 'react';

import axios from 'axios'

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { styles } from './StylesBuyModal'

export default function BuyModal({ isBuyModal, setIsBuyModal, productId, setProduct, token, setIsProductBought }) {

  const handleClose = () => setIsBuyModal(false);

  function handlePurchase(responseData) {
    // setProduct belongs to detail page
    if (setProduct) {
      setProduct(responseData);
    }
    // detail and account pages
    setIsProductBought(true);
  }
  async function buyProduct() {

    const address = `https://bootcamp.akbolat.net/products/${productId}`
    await axios.put(address, { isSold: true }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => handlePurchase(response.data)).catch((err) => console.log(err.message))

    handleClose();
  }

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isBuyModal}
        onClose={handleClose}
        closeAfterTransition
        disableAutoFocus
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style: { opacity: 0.7, background: '#4B9CE2' }
        }}
      >
        <Fade in={isBuyModal}>
          <Box sx={styles.modalStyle}>
            <Typography id="transition-modal-title" variant="h5" sx={styles.modalTitle}>
              Satın AI
            </Typography>
            <Typography id="transition-modal-description" sx={styles.modalText}>
              Satın AImak istiyor musunuz?
            </Typography>
            <Button sx={styles.cancelButton} onClick={handleClose}>Vazgeç</Button>
            <Button onClick={buyProduct} sx={styles.proceedButton}>Satın AI</Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}