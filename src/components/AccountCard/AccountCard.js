import React, { useContext } from 'react'

import { Box, Typography, Button } from '@mui/material'
import axios from 'axios'
import { useWindowSize } from "@react-hook/window-size/throttled";

import {styles} from './StylesAccountCard'
import UserContext from '../../contexts/UserContext'
import MobileContext from '../../contexts/MobileContext'

export default function CardItem({ activePage,  offerId, status, isSold, offerStatus, productId, setUpdatedItemId, setUpdatedItemOfferId, setIsAcceptOrReject, setBoughtProductId, setIsBuyModal, offerInfos }) {

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

    function handlePurchase(productId) {
        setIsBuyModal(true);
        setBoughtProductId(productId);
    }

    function renderCardName() {
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
                style={{
                    borderRadius: '8px',
                    width: '75px',
                    height: '84px',
                }} />
        )
    }

    const renderPrice = () => {

        return (
            <>
                <Typography sx={{
                    color: '#B1B1B1',
                    fontSize: { xs: '15px', lg: '16px' }
                }}>
                    AIınan Teklif:
                </Typography>
                <Typography sx={{
                    fontWeight: '700',
                    fontSize: { xs: '15px', lg: '16px' }
                }}>
                    {parseFloat(offerInfos.offerPrice).toFixed(2)} TL
                </Typography>
            </>
        )
    }

    function renderCardNameImageOffer() {

        const imageView = renderCardImage();
        const nameView = renderCardName();
        const priceView = renderPrice();

        return (
            <Box sx={{ display: 'flex', gap: 1.5 }}>
                {imageView}
                <Box>
                    {nameView}
                    <Box sx={{
                        background: '#F2F2F2',
                        borderRadius: '8px',
                        display: 'flex',
                        gap: 1,
                        pl: 1.3,
                        pr: { xs: 7.1, lg: 7 },
                        py: 1,
                        mt: 0.8,
                    }}>
                        {priceView}
                    </Box>
                </Box>
            </Box>
        )
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
                        onClick={() => {
                            setIsAcceptOrReject(true);
                            updateOfferStatus(id, true);
                        }}
                        sx={{
                            color: '#fff',
                            fontSize: '15px',
                            py: 0.3,
                            px: { xs: 3.85, lg: 2 },
                            mr: 1.5,
                            borderRadius: '8px',
                            '&:hover': { background: '#4B9CE2' }
                        }}>
                        Onayla
                    </Button>

                    <Button onClick={() => {
                        setIsAcceptOrReject(false);
                        updateOfferStatus(id, false);
                    }}
                        variant='contained'
                        sx={{
                            background: '#F77474',
                            color: '#fff',
                            fontSize: '15px',
                            py: 0.3,
                            px: { xs: 3.85, lg: 2 },
                            borderRadius: '8px',
                            '&:hover': { background: '#F77474' }
                        }}>Reddet</Button>
                </Box>
            )
        } else if (status) {
            return renderOfferStatusText('OnayIandı', 'primary.main')

        } else if (!status) {
            return renderOfferStatusText('Reddedildi', 'danger')
        }

    }

    function renderOfferStatusText(text, color) {
        return (
            <Typography variant='h6'
                sx={{
                    alignSelf: { xs: 'end', lg: 'center' },
                    color: color,
                    fontSize: { xs: '15px', xl: '1.125rem' },
                    mr: { xs: 2.3, lg: 0 }
                }}>{text}</Typography>
        )
    }

    const renderOfferStatus = () => {

        const offerStatus = offerInfos.status;
        let text = '';
        let textColor = '';

        // if offer approved
        if(offerStatus){
            text = 'Onaylandı';
            textColor = 'primary.main';
        }
        // if offer not responded yet
        else if(offerStatus === null){
            text = 'Beklemede';
            textColor = 'orange';
        }
        // if offer rejected
        else if(!offerStatus){
            text = 'Reddedildi';
            textColor = 'danger';
        }
        
        return (
            <Typography variant='h6'
                sx={{
                    alignSelf: { xs: 'end', lg: 'center' },
                    color: textColor,
                    fontSize: { xs: '15px', xl: '1.125rem' },
                    mr: { xs: 2.3, lg: 0 }
                }}>
                    {text}
                </Typography>
        )
    }

    function renderSentOffersBtnAndStatus(offerStatus, isSold, productId) {

        const statusView = renderOfferStatus();

       
            return (
                <Box sx={{
                    alignSelf: { xs: 'end', lg: 'center' },
                    display: 'flex',
                }}>
                    {!isSold && offerStatus &&
                        <Button variant='contained'
                            onClick={() => handlePurchase(productId)}
                            sx={{
                                color: '#fff',
                                fontSize: '15px',
                                py: 0.3,
                                px: { xs: 4.2, lg: 2 },
                                mr: 3.5,
                                borderRadius: '8px',
                                '&:hover': { background: '#4B9CE2' }
                            }}>
                            Satın AI
                        </Button>}
                        {statusView}
                </Box>
            )
        
    }

    function renderUserProducts(offerId, status) {

        return (
            <Box sx={styles.offerContainer}>
                {renderCardNameImageOffer()}
                {renderRecievedOfferBtnsAndText()}
            </Box>
        )
    }

    function renderSentOffers(offerStatus, isSold, productId) {
        return (
            <Box sx={styles.offerContainer}>
                {renderCardNameImageOffer()}
                {renderSentOffersBtnAndStatus(offerStatus, isSold, productId)}
            </Box>
        )
    }

    return (
        <div>{activePage === 'Teklif Aldıklarım' ?
            renderUserProducts(offerId, status)
            : renderSentOffers(offerStatus, isSold, productId)}
        </div>
    )
}
