import React, { useState } from 'react';

import { Backdrop, Box, Button, Container, Fade, Modal, Typography } from '@mui/material'

import axios from 'axios'

import { styles } from './StylesOfferModal'
import CloseIcon from '../../constants/icons/CloseIcon';
import ConfirmIcon from '../../constants/icons/ConfirmIcon';

export default function OfferModal({ isOfferModal, setIsOfferModal, product, userAuth, setOffer, setOfferError }) {
    const handleClose = () => setIsOfferModal(false);

    const [activeCheckbox, setActiveCheckbox] = useState(null);
    const [givenOffer, setGivenOffer] = useState('');

    function handleCheckbox(ratio) {
        setGivenOffer((Number(product.price) * (ratio / 100)).toFixed(2));

        setActiveCheckbox(ratio);
    }

    function renderCheckboxes() {

        const ratios = [20, 30, 40];

        const ratioLetters = {
            20: 'si',
            30: 'u',
            40: 'ı',
        }

        return ratios.map((ratio, index) => {

            const text = `%${ratio}'${ratioLetters[ratio]} Kadar Teklif Ver`;

            let visual;
            let textColor;

            if(activeCheckbox === ratio) {
                visual =  <ConfirmIcon />;
                textColor = 'primary.main';
            }
            else {
                visual = <img src={'/images/ellipse-outline.png'} alt="small-ellipse" />;
                
                textColor = '#525252';
            }

            return (
                <Box key={index}
                    sx={styles.ratioWrapper}
                    onClick={() => handleCheckbox(ratio)}>
                    <Box sx={{ ml: 1 }}>
                        {visual}
                    </Box>
                    <Typography sx={{
                        color: textColor,
                        fontSize: { xs: '15px', lg: '1rem' }
                    }}>
                        {text}
                    </Typography>
                </Box>
            )
        })
    }
    function renderHeader() {

        return (
            <Box sx={styles.headerContainer}>
                <Typography sx={styles.headerText}>
                    Teklif Ver
                </Typography>
                <div onClick={handleClose}>
                    <CloseIcon />
                </div>
            </Box>
        )
    }
    function renderNameImgAndPrice(image, price) {
        return (
            <Box sx={styles.mainContainer}>
                <Box sx={{ display: 'flex', width: '50%' }}>
                    <img src={image} alt="" style={styles.img} />
                    <Typography sx={styles.name}>
                        {product.name}
                  </Typography>
                </Box>
                <Typography sx={styles.price} variant='h6'>
                    {price} TL
                </Typography>
            </Box>
        )
    }
    function renderOfferInput() {
        return (
            <div className='offer-wrapper'>
                <input className='offer-input' type="number" placeholder='Teklif Belirle' value={givenOffer} onChange={(e) => setGivenOffer(e.target.value)} />
            </div>
        )
    }
    function renderConfirmBtn() {
        return (
            <Box sx={{ mx: 'auto' }}>
                <Button variant='contained'
                    onClick={sendOffer}
                    sx={styles.confirmBtn}>
                        Onayla
                 </Button>
            </Box>
        )
    }
    async function sendOffer() {
        const address = `https://bootcamp.akbolat.net/offers`
        await axios.post(address, { product: product.id, users_permissions_user: userAuth.id, offerPrice: Number(givenOffer) }, {
            headers: {
                Authorization: `Bearer ${userAuth.token}`,
            },
        }).then((response) => {
            if (response.data.product.isOfferable) {
                setOffer({ id: response.data.id, price: response.data.offerPrice });
            } else {
                setOfferError('Bu ürün teklif kabul etmiyor')
            }
        }).catch((err) => console.log(err.message))

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
                    style: { opacity: 0.7, background: '#4B9CE2' }
                }}
            >
                <Fade in={isOfferModal}>
                    <Container sx={styles.container}>
                        {renderHeader()}
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
