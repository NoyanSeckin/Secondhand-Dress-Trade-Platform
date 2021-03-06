import React, { useContext } from 'react'

import { Box, Typography, Button } from '@mui/material'
import axios from 'axios'
import { useWindowSize } from "@react-hook/window-size/throttled";

import { styles } from './StylesAccountCard'
import UserContext from '../../contexts/UserContext'
import MobileContext from '../../contexts/MobileContext'

export default function CardItem({ activePage, setItemInfos, setIsAcceptOrReject, setIsBuyModal, offerInfos }) {

    const { userAuth } = useContext(UserContext);
    const mobileScreen = useContext(MobileContext)
    const [width] = useWindowSize({ fps: 60 });
    
    
    // update users recieved offers
    async function updateOfferStatus(bool) {

        const id = offerInfos.offerId;
        const address = `https://bootcamp.akbolat.net/offers/${id}`

        await axios.put(
            address, 
            { 
                isStatus: bool 
            }, 
            {
            headers: {
                Authorization: `Bearer ${userAuth.token}`
            }
        })
        .then(response => {
            setItemInfos(prevInfos => ({ ...prevInfos, itemId: response.data.product.id, offerId: response.data.id }))
        })
        .catch(err => console.log(err))

    }

    const handlePurchase = () => {
        setIsBuyModal(true);
        setItemInfos(prevInfos => ({...prevInfos, boughtProductId: offerInfos.productId}))

    }

    const renderCardName = () => {
        let cardName = offerInfos.name;

        // if name lenght is long, add ... dots after 23 chars
        if (width < mobileScreen && cardName) {
            const totalWhitespace = cardName.split(' ').length - 1;
            const totalCharacters = cardName.length;
            const totalSpace = totalWhitespace + totalCharacters;
            if (totalSpace > 24) {
                cardName = cardName.substring(0, 23) + '...';
            }
        }

        return (
            <Typography variant='h6'>
                {cardName}
            </Typography>
        )
    }

    const renderCardImage = () => {

        return (
            <img src={offerInfos.image} alt=""
                style={styles.image} />
        )
    }

    const renderPrice = () => {

        const price = parseFloat(offerInfos.offerPrice).toFixed(2);

        return (
            <>
                <Typography sx={{
                    ...styles.priceText,
                    color: '#B1B1B1',
                }}>
                    AI??nan Teklif:
                </Typography>
                <Typography sx={{
                    ...styles.priceText,
                    fontWeight: '700',
                }}>
                    {price} TL
                </Typography>
            </>
        )
    }

    function renderCardNameImagePrice() {

        const imageView = renderCardImage();
        const nameView = renderCardName();
        const priceView = renderPrice();

        return (
            <Box sx={{ display: 'flex', gap: 1.5 }}>
                {imageView}
                <Box>
                    {nameView}
                    <Box sx={styles.priceContainer}>
                        {priceView}
                    </Box>
                </Box>
            </Box>
        )
    }

    const checkOfferStatus = () => {

        const offerStatus = offerInfos.status;
        let text = '';
        let textColor = '';

        // if offer approved
        if (offerStatus) {
            text = 'Onayland??';
            textColor = 'primary.main';
        }
        // if offer not responded yet
        else if (offerStatus === null) {
            text = 'Beklemede';
            textColor = 'orange';
        }
        // if offer rejected
        else if (!offerStatus) {
            text = 'Reddedildi';
            textColor = 'danger';
        }

        return { text, textColor };
    }

    const renderOfferStatus = () => {

        const { text, textColor } = checkOfferStatus();

        return (
            <Typography variant='h6'
                sx={{ ...styles.offerStatus, color: textColor }}>
                {text}
            </Typography>
        )
    }

    const handleApprove = () => {
        setIsAcceptOrReject(true);
        updateOfferStatus(true);
    }

    const handleReject = () => {
        setIsAcceptOrReject(false);
        updateOfferStatus(false);
    }

    function renderRecievedOfferBtnsAndText() {

        const status = offerInfos.status;

        if (status === null) {

            return (
                <Box sx={{
                    alignSelf: { xs: 'end', lg: 'center' }
                }}>
                    <Button variant='contained'
                        onClick={handleApprove}
                        sx={{
                            ...styles.approveButton,
                            px: { xs: 3.85 }
                        }}>
                        Onayla
                    </Button>

                    <Button onClick={handleReject}
                        variant='contained'
                        sx={styles.rejectButton}>Reddet
                    </Button>
                </Box>
            )
        }
        else {
            const statusView = renderOfferStatus();
            return statusView;
        }

    }

    function renderSentOffersBtnAndStatus() {

        const status = offerInfos.status;
        const isSold = offerInfos.isSold;

        let buttonView;
        const statusView = renderOfferStatus();

        if (status && !isSold) {
            buttonView = (
                <Button variant='contained'
                    onClick={handlePurchase}
                    sx={{
                        ...styles.approveButton,
                        mr: 3.5
                    }}>
                    Sat??n AI
                </Button>)
        }
        return (
            <Box sx={{
                alignSelf: { xs: 'end', lg: 'center' },
                display: 'flex',
            }}>
                {buttonView}
                {statusView}
            </Box>
        )

    }

    const cardNameImagePriceView = renderCardNameImagePrice();

    const buttonsView = activePage === 'Teklif Ald??klar??m' ? renderRecievedOfferBtnsAndText() : renderSentOffersBtnAndStatus();

    return (
        <Box sx={styles.offerContainer}>
            {cardNameImagePriceView}
            {buttonsView}
        </Box>
    )
}
