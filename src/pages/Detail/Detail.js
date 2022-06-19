import React, { useState, useContext, useEffect } from 'react'

import { Box, Container, Button, Typography, Grid } from '@mui/material'

import axios from 'axios'
import { useWindowSize } from "@react-hook/window-size/throttled";

import { styles } from './StylesDetail';
import ProductContext from '../../contexts/ProductContext'
import BuyModal from '../../components/BuyModal/BuyModal'
import OfferModal from '../../components/OfferModal'
import UserContext from '../../contexts/UserContext'
import Alert from '../../components/Alert/Alert'
import MobileContext from "../../contexts/MobileContext";

export default function Detail() {
    const { product, setProduct } = useContext(ProductContext)
    const { userAuth } = useContext(UserContext)
    const mobileScreen = useContext(MobileContext)

    const [width] = useWindowSize({ fps: 60 });

    const [offer, setOffer] = useState({})
    const [offerError, setOfferError] = useState('')
    const [isBuyModal, setIsBuyModal] = useState(false);
    const [isOfferModal, setIsOfferModal] = useState(false);
    const [isProductBought, setIsProductBought] = useState(false);
    const alternativeText = 'Belirtilmemiş';

    // useEffect(() => {
    //     console.log(product)
    // }, []);

    // useEffect(() => {
    //     // scroll to the top of page
    //     document.body.scrollTop = 0; // For Safari
    //     document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    //     // use local storage to avoid data crash on refresh
    //     const isSessionItem = sessionStorage.getItem('product-detail')
    //     if (product.id) {
    //         sessionStorage.setItem('product-detail', JSON.stringify(product))
    //     } else if (isSessionItem && !product.id) {
    //         setProduct(JSON.parse(isSessionItem))
    //     }

    // }, [])

    async function withdrawOffer() {
        
        const address = `https://bootcamp.akbolat.net/offers/${offer.id}`;
        
        await axios.delete(address, {
            headers: {
                Authorization: `Bearer ${userAuth.token}`,
            },
        })
        .then(() => setOffer({})).catch(err => console.log(err))
    }

    function renderDetailPage(name, brand, color, condition, productPrice, description, image, isSold, offerPrice) {
        return (
            <Container maxWidth='xl' sx={styles.container}>
                <Grid container
                    sx={styles.gridContainer}>
                    <Grid item xs={12} lg={6}>
                        {renderItemImage(image)}
                    </Grid>
                    <Grid item xs={12} lg={6}
                        sx={styles.gridItemWithText}>
                        {renderTitle(name)}
                        {width > mobileScreen ? renderItemDetails(brand, color, condition) : renderPriceAndOffer(productPrice, offerPrice)}
                        {width < mobileScreen ? renderItemDetails(brand, color, condition) : renderPriceAndOffer(productPrice, offerPrice)}
                        {renderIsSold(isSold)}
                        {renderBtns(isSold)}
                        {renderDescription(description)}
                    </Grid>
                </Grid>
            </Container>
        )
    }

    function renderOffer(){
        
        return(
            <Box sx={{ display: 'flex' }}>
                <Typography variant='h6'
                    sx={styles.offerText}>
                    Verilen Teklif:
                </Typography>
                <Typography variant='h6'
                    sx={styles.offerPriceText}>
                    {offer?.price} TL
                </Typography>
            </Box>
        )
    }

    function renderGivenOffer() {

        if (offer?.price) {
            const offerView = renderOffer()
            return (
                <Box sx={{ display: 'flex' }}>
                    <Box sx={styles.givenOfferContainer}>
                        {offerView}
                    </Box>
                </Box>
            )
        }
    }

    function renderIsSold(isSold) {
        if (isSold) {
            return (
                <Box sx={styles.soldContainer}>
                    <Typography variant='h6'
                        sx={styles.soldText}>
                            Bu Ürün Satışta Değil
                    </Typography>
                </Box>
            )
        }
    }

    function renderItemImage(image) {

        return(
            <img className='detail-img' style={styles.image} src={image} alt="" />
        )
    }

    function renderTitle(name) {

        return(
            <Typography variant='h3'
            sx={styles.title}>
                {name}
        </Typography>
        )
    }

    function renderItemDetails(brand, color, condition) {
        
        const detailTitles = { [brand]: 'Marka', [color]: 'Renk', [condition]: 'Kullanım Durumu' };
        
        const detailsArray = [brand, color, condition];
        
        return (
            <Box sx={styles.detailsContainer}>
                {detailsArray.map((detail, index) => {
                    return (
                        <Box key={index} sx={styles.detailContainer}>
                            <Typography sx={styles.detailText}>
                                {detailTitles[detail]}:
                            </Typography>
                            <Typography sx={{ width: '55%' }}>
                                {detail || alternativeText}
                            </Typography>
                        </Box>
                    )
                })}
            </Box>
        )
    }

    function renderPriceAndOffer(productPrice) {

        const givenOfferView = renderGivenOffer();

        return (
            <Box sx={styles.priceContainer}>
                <Typography sx={styles.priceText}>
                    {productPrice} TL
                </Typography>
                {givenOfferView}
            </Box>
        )
    }

    function renderOfferBtn() {
        
        let buttonText;
        let buttonOnClick;

        if(!product.isOfferable){
            buttonText = 'Teklif Verilemez';
        }
        else if (offer?.price){
            buttonText = 'Teklifi Geri Çek';
            buttonOnClick = withdrawOffer;
        }
        else {
            buttonText = 'Teklif Ver';
            buttonOnClick = () => setIsOfferModal(true);
        }

        return(
            <Button disabled={!product.isOfferable} 
            sx={{
                ...styles.offerButton, 
                px: {
                    xs: offer?.price ? 3.15 : 6.15,
                    lg: offer?.price ? 7 : 10.5
                }
            }}
                onClick={buttonOnClick}>
                    {buttonText}
            </Button>
        )
    }

    function renderBtns(isSold) {

        const offerBtnView = renderOfferBtn();

        if (!isSold) {
            return (
                <Box sx={styles.buttonsContainer}>
                    <Button variant='contained' sx={styles.buyButton}
                        onClick={() => setIsBuyModal(true)}>
                        Satın AI
                    </Button>
                    {offerBtnView}
                </Box>
            )
        }
    }

    function renderDescription(description) {
        return (
            <Box>
                <Typography sx={{
                    fontWeight: '700',
                    mt: { xs: 0.6, lg: 2.5 },
                    mb: 0.5,
                    fontSize: { xs: '15px', lg: '20px' }
                }}>
                    Açıklama
                </Typography>
                <Typography sx={{
                    color: '#555555',
                    fontSize: '15px',
                    pr: { xs: 0, lg: 18 },
                    mr: 6,
                    mb: { xs: 2, lg: 0 }
                }}>
                    {description || alternativeText}
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={styles.boxContainer}>

            {renderDetailPage(product.name, product.brand, product.color, product.status, product.price, product.description, `https://bootcamp.akbolat.net${product.image?.url}`, product.isSold)}

            <BuyModal isBuyModal={isBuyModal} setIsBuyModal={setIsBuyModal} productId={product.id} setProduct={setProduct} token={userAuth.token} setIsProductBought={setIsProductBought} />

            <OfferModal isOfferModal={isOfferModal} setIsOfferModal={setIsOfferModal} product={product} userAuth={userAuth} setOffer={setOffer} setOfferError={setOfferError} offerError={offerError} screen={width} mobileScreen={mobileScreen} />

            <Alert isAlert={isProductBought} setIsAlert={setIsProductBought} alertText='Satın Alındı' />
        </Box>
    )
}
