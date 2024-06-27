export const styles = {
    
    boxContainer: {
        background: '#F2F2F2',
        height: { xs: 'auto', xl: '120vh' },
        pb: { xs: 9, xl: 0 }
    },

    container: { 
        pt: { 
            xs: 10, 
            xl: 12 
        } 
    },

    image: {
        borderRadius: '8px',
        width: '100%',
        maxHeight: '737px',
        maxWidth: '700px',
        height: 'auto',
    },

    gridContainer: {
        bgcolor: '#fff',
        borderRadius: '8px',
        p: {
            xs: 0.7, 
            xl: 2 
        },
    },

    gridItemWithText: {
        display: 'flex',
        flexDirection: 'column',
        pl: { 
            xs: 1, 
            xl: 5 
        } 
    },

    title: {
        order: 1,
        mt: 1.5,
        fontSize: { 
            xs: '18px', 
            xl: '2.125rem' 
        }
    },

    detailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        order: {
            xs: 3, md: 2
        },
        gap: {
            xs: 0.6, 
            xl: 2 
        },
        mt: { 
            xs: 0, 
            xl: 2 
        },
        width: {
            xs: '100%', 
            lg: '50%' 
        },
    },
    
    detailContainer: { 
        display: 'flex', 
        justifyContent: 'space-between' 
    },

    detailText: {
        fontWeight: '700',
        fontSize: { 
            xs: '15px', 
            lg: '16px' 
        },
    },

    givenOfferContainer: {
        bgcolor: 'lightBg',
        display: 'flex',
        borderRadius: '8px',
        pl: {
            xs: 1.3, 
            xl: 1.6 
        },
        pr: {
            xs: 1.3, 
            xl: 5.3 
        },
        py: {
            xs: 0.3, 
            xl: 0.9 
        },
    },

    offerText: {
        color: '#B1B1B1',
        mr: 0.4,
        fontSize: { 
            xs: '12px', 
            xl: '1.125rem' 
        },
        alignSelf: { 
            xs: 'center', 
            xl: 'start' 
        }
    },

    offerPriceText: {
        color: 'textColor',
        fontWeight: 'bold',
        fontSize: { 
            xs: '15px', 
            xl: '1.125rem' 
        }
    },

    soldContainer: {
        display: 'flex',
        background: { 
            xs: '#fff', 
            sm: 'none' 
        },
        bottom: 0,
        left: { 
            xs: '0', 
            sm: 0 
        },
        mb: { 
            xs: 0.6, 
            sm: 0 
        },
        pt: { 
            xs: 1, 
            sm: 0 
        },
        pb: { 
            xs: 0.7, 
            sm: 0 
        },
        position: { 
            xs: 'fixed', 
            sm: 'relative' 
        },
        width: '100%'
    },

    soldText: {
        bgcolor: '#FFF0E2',
        color: '#FAAD60',
        fontWeight: '600',
        borderRadius: '8px',
        px: { 
            xs: 10.5, 
            sm: 3 
        },
        py: 1,
        mx: { 
            xs: 'auto', 
            sm: 0 
        }
    },

    priceContainer: {
        order: {xs: 2, md: 3},
        display: { 
            xs: 'flex', 
            lg: 'block' 
        },
        justifyContent: 'space-between',
        maxWidth: { 
            sm: '285px', 
            lg: '250px' 
        },
        my: { 
            xs: 1, 
            xl: 2.5 
        }
    },

    priceText: {
        fontWeight: '700',
        fontSize: { 
            xs: '20px', 
            xl: '25px' 
        }
    },

    offerButton: {
        background: '#F0F8FF',
        borderRadius: '8px',
        color: 'primary.main',
        fontSize: { xs: '18px', lg: '20px' },
    },

    buttonsContainer: {
        background: { xs: '#fff', sm: 'none' },
        bottom: 0,
        order: 4,
        left: { 
            xs: '-24px', 
            sm: 0 
        },
        mb: { 
            xs: 0.6, 
            sm: 0 
        },
        py: { 
            xs: 1, 
            sm: 0 
        },
        position: { 
            xs: 'fixed', 
            sm: 'relative' 
        },
        width: { 
            xs: '110%', 
            sm: '100%' 
        },
    }, 

    buyButton: {
        bgcolor: 'primary.main',
        borderRadius: '8px',
        color: '#fff',
        fontWeight: 700,
        fontSize: { 
            xs: '18px', 
            lg: '20px' 
        },
        mr: 1,
        ml: { 
            xs: 5, 
            sm: 0, 
            lg: 0 
        },
        px: { 
            xs: 6.15, 
            lg: 10.5 
        },
        '&:hover': {
            bgcolor: 'primary.light'
        }
    },

    descriptionTitle: {
        fontWeight: '700',
        fontSize: { 
            xs: '15px', 
            lg: '20px' 
        },
        mt: { 
            xs: 0.6, 
            lg: 2.5 
        },
        mb: 0.5,
    },

    descriptionText: {
        color: '#555555',
        fontSize: '15px',
        mr: 6,
        mb: { 
            xs: 2, 
            lg: 0 
        },
        pr: { 
            xs: 0, 
            lg: 18 
        },
    }

}