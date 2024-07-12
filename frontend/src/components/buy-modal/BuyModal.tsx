import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styles } from './StylesBuyModal';

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuyProduct: () => void;
}

export const BuyModal = ({ isOpen, onClose, onBuyProduct }: BuyModalProps) => {
  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        disableAutoFocus
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style: { opacity: 0.7, background: '#4B9CE2' },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={styles.modalStyle}>
            <Typography id="transition-modal-title" variant="h5" sx={styles.modalTitle}>
              Satın AI
            </Typography>
            <Typography id="transition-modal-description" sx={styles.modalText}>
              Satın AImak istiyor musunuz?
            </Typography>
            <Button sx={{ ...styles.button, ...styles.cancelButton }} onClick={onClose}>
              Vazgeç
            </Button>
            <Button onClick={onBuyProduct} sx={{ ...styles.button, ...styles.proceedButton }}>
              Satın AI
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};
