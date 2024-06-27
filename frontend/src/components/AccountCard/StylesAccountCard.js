export const styles = {

    offerContainer: {
        border: '1px solid #F2F2F2',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        justifyContent: 'space-between',
        mt: { xs: 1.2, lg: 2.5 },
        pl: { xs: 1, lg: 2 },
        pr: { xs: 1, xl: 3 },
        py: 1,
    },

    image: {
        borderRadius: '8px',
        width: '75px',
        height: '84px',
    },

    priceContainer: {
        background: '#F2F2F2',
        borderRadius: '8px',
        display: 'flex',
        gap: 1,
        pl: 1.3,
        mt: 0.8,
        py: 1,
        pr: { 
            xs: 7.1, 
            lg: 7 
        },
    },

    priceText: {
        fontSize: {
            xs: '15px',
            lg: '16px'
        },
    },

    offerStatus: {
        alignSelf: { 
            xs: 'end', 
            lg: 'center' 
        },
        fontSize: { 
            xs: '15px', 
            xl: '1.125rem' 
        },
        mr: { 
            xs: 2.3, 
            lg: 0 
        }
    },

    approveButton: {
        borderRadius: '8px',
        color: '#fff',
        fontSize: '15px',
        py: 0.3,
        px: { 
            xs: 4.2, 
            lg: 2 
        },
        '&:hover': { 
            bgcolor: 'primary.main' 
        }
    },

    rejectButton: {
        bgcolor: 'danger',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '15px',
        ml: 1.5,
        py: 0.3,
        px: { 
            xs: 3.85, 
            lg: 2 
        },
        '&:hover': { 
            bgcolor: 'danger' 
        }
    },
}