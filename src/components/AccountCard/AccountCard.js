import React, { useContext } from 'react'

import { Box, Typography, Button } from '@mui/material'
import axios from 'axios'
import { useWindowSize } from "@react-hook/window-size/throttled";

import { styles } from './StylesAccountCard'
import UserContext from '../../contexts/UserContext'
import MobileContext from '../../contexts/MobileContext'

export default function CardItem({ activePage, setUpdatedItemId, setUpdatedItemOfferId, setIsAcceptOrReject, setBoughtProductId, setIsBuyModal, offerInfos }) {

    const { userAuth } = useContext(UserContext);
    const mobileScreen = useContext(MobileContext)
    const [width] = useWindowSize({ fps: 60 });
    // update users recieved offers
    async function updateOfferStatus(id, bool) {

        const address = `https://bootcamp.akbolat.net/offers/${id}`

        await axios.put(address, { isStatus: bool }, {
            headers: {
                Authorization: `Bearer ${userAuth.token}`
            }
        }).then(response => {
            setUpdatedItemOfferId(response.data.id)
            setUpdatedItemId(response.data.product.id)

            console.log(response.data)
        }).catch(err => console.log(err))

    }

    const handlePurchase = () => {
        setIsBuyModal(true);
        setBoughtProductId(offerInfos.productId);
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
                    AIınan Teklif:
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
            text = 'Onaylandı';
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
        const id = offerInfos.offerId;
        setIsAcceptOrReject(true);
        updateOfferStatus(id, true);
    }

    function renderRecievedOfferBtnsAndText() {

        const status = offerInfos.status;
        const id = offerInfos.offerId;

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

                    <Button onClick={() => {
                        setIsAcceptOrReject(false);
                        updateOfferStatus(id, false);
                    }}
                        variant='contained'
                        sx={styles.rejectButton}>Reddet</Button>
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
        const productId = offerInfos.productId;
        const isSold = offerInfos.isSold;

        let buttonView;
        const statusView = renderOfferStatus();

        if (status && !isSold) {
            buttonView = (
                <Button variant='contained'
                    onClick={() => handlePurchase(productId)}
                    sx={{
                        ...styles.approveButton,
                        mr: 3.5
                    }}>
                    Satın AI
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

    const buttonsView = activePage === 'Teklif Aldıklarım' ? renderRecievedOfferBtnsAndText() : renderSentOffersBtnAndStatus();

    return (
        <Box sx={styles.offerContainer}>
            {cardNameImagePriceView}
            {buttonsView}
        </Box>
    )
}
