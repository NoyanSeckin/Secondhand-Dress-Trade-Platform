import { Container, Box, Typography } from '@mui/material'
import axios from 'axios'
import { useWindowSize } from "@react-hook/window-size/throttled";

import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../../contexts/UserContext'
import MobileContext from "../../contexts/MobileContext";

import { styles } from './StylesAccount';
import AccountCard from '../../components/AccountCard/AccountCard.js'
import AccountIcon from '../../constants/icons/AccountIcon'
import BuyModal from '../../components/BuyModal/BuyModal'
import Alert from '../../components/Alert/Alert'

export default function Account() {

    const { userAuth } = useContext(UserContext);
    const [width] = useWindowSize({ fps: 60 });
    const mobileScreen = useContext(MobileContext);

    const [activePage, setActivePage] = useState('Teklif Aldıklarım');

    const [recievedOffers, setRecievedOffers] = useState([]);

    const [sentOffers, setSentOffers] = useState([]);

    // used for getting product and offer ids 
    const [itemInfos, setItemInfos] = useState({});

    const [isAcceptOrReject, setIsAcceptOrReject] = useState(false);
    const [isProductBought, setIsProductBought] = useState(false);

    const [isBuyModal, setIsBuyModal] = useState(false);

    // fetch data 
    useEffect(() => {

        if (activePage === 'Teklif Aldıklarım') {

            async function fetchRecievedOffers() {

                const address = `https://bootcamp.akbolat.net/products?users_permissions_user=${userAuth.id}`;

                axios.get(
                    address,
                    {
                        headers: {
                            Authorization: `Bearer ${userAuth.token}`
                        }
                    })
                    .then(response => setRecievedOffers(response.data))
                    .catch(err => console.log(err))
            }

            fetchRecievedOffers();
        }
        else if (activePage === 'Teklif Verdiklerim') {

            async function fetchSentOffers() {

                const address = `https://bootcamp.akbolat.net/offers?users_permissions_user=${userAuth.id}`;

                axios.get(
                    address,
                    {
                        headers: {
                            Authorization: `Bearer ${userAuth.token}`
                        }
                    }
                )
                    .then(response => setSentOffers(response.data))
                    .catch(err => console.log(err))
            }

            fetchSentOffers();
        }

    }, [activePage, userAuth.id, userAuth.token])

    // update recievedOffers on change to avoid api request
    useEffect(() => {

        if (itemInfos.offerId) {

            const filteredArray = [];

            recievedOffers.forEach(product => {

                if (product.id === itemInfos.itemId) {

                    product.offers.forEach(offer => {
                        if (offer.id === itemInfos.offerId) {
                            offer.isStatus = isAcceptOrReject;
                            filteredArray.push(product);
                        }
                    })
                } else filteredArray.push(product);
            })
            setRecievedOffers(filteredArray);
        }
    }, [itemInfos.offerId])

    //  update sentOffers array to avoid api request
    useEffect(() => {

        if (isProductBought) {

            let filteredArray = [];
            sentOffers.forEach(offer => {

                if (offer?.product?.id === itemInfos.boughtProductId) {
                    offer.product.isSold = true;
                    filteredArray.push(offer);
                }
                else filteredArray.push(offer);
            })
            setSentOffers(filteredArray);
        }
    }, [isProductBought])



    function renderRecievedOffers() {

        const cards = recievedOffers?.map(product => (

            product.offers?.map((offer, index) => {
                const imageUrl = width > mobileScreen ? product.image?.url : product?.image?.formats?.thumbnail?.url;

                const image = `https://bootcamp.akbolat.net${imageUrl}`;

                const offerInfos = {
                    name: product.name,
                    image,
                    offerPrice: offer?.offerPrice,
                    offerId: offer?.id,
                    status: offer?.isStatus,
                }
                return (
                    <AccountCard key={index} offerInfos={offerInfos}
                        setItemInfos={setItemInfos}
                        activePage={activePage}
                        setIsAcceptOrReject={setIsAcceptOrReject}
                    />
                )
            })
        ))

        return cards;
    }



    const renderSentOffers = () => {

        const accountCards = sentOffers.map((offer, index) => {

            const offerInfos = {
                name: offer?.product?.name,
                image: `https://bootcamp.akbolat.net${offer?.product?.image?.url}`,
                offerPrice: offer?.offerPrice,
                status: offer?.isStatus,
                productId: offer?.product?.id,
                isSold: offer?.product?.isSold,
            }

            return (
                <AccountCard key={index} offerInfos={offerInfos} activePage={activePage}
                    setIsBuyModal={setIsBuyModal}
                    setItemInfos={setItemInfos} />
            )
        })

        return accountCards;
    }

    function renderEmail(email) {

        return (
            <Box sx={styles.emailContainer}>
                <AccountIcon />
                <Typography sx={styles.emailText}>
                    {email}
                </Typography>
            </Box>
        )
    }

    function renderNavs() {

        const navs = ['Teklif Aldıklarım', 'Teklif Verdiklerim']

        const navEls = navs.map(nav => {
            return (
                <Typography key={nav} className={nav === activePage && 'active-nav'} onClick={() => setActivePage(nav)}
                    sx={{
                        ...styles.navText,
                        fontWeight: nav === activePage && '700',
                    }}>
                    {nav}
                </Typography>
            )
        })

        return (
            <Box sx={styles.navContainer}>
                {navEls}
                <hr className='account-hr' />
            </Box>
        )
    }

    function renderPage() {

        const pageView = activePage === 'Teklif Aldıklarım' ? renderRecievedOffers() : renderSentOffers()

        return (
            <Box sx={styles.columnReverse}>
                {pageView}
            </Box>
        )
    }

    const renderBuyModal = () => {

        return (
            <BuyModal isBuyModal={isBuyModal} setIsBuyModal={setIsBuyModal} productId={itemInfos?.boughtProductId} setIsProductBought={setIsProductBought}
                token={userAuth.token} />
        )
    }

    const renderAlert = () => {

        return (
            <Alert isAlert={isProductBought} setIsAlert={setIsProductBought} alertText='Satın Alındı' />
        )
    }

    const emailView = renderEmail(userAuth.email);
    const navsView = renderNavs();
    const pageView = renderPage();
    const buyModalView = renderBuyModal();
    const alertView = renderAlert();

    return (
        <Box sx={styles.boxContainer}>

            <Container maxWidth="xl"
                sx={styles.container}>

                {emailView}

                <Box sx={styles.pageContainer}>
                    {navsView}
                    {pageView}
                </Box>

            </Container>

            {buyModalView}
            {alertView}

        </Box>
    )
}
