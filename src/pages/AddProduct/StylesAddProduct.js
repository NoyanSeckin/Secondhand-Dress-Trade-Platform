export const styles = {

    boxContainer: {
        bgcolor: 'lightBg',
        minHeight: { 
            xs: 'auto', 
            lg: '120vh' 
        },
        pb: { 
            xs: 1.5, 
            lg: 0 
        }
    },
    
    container: { 
        position: 'relative',
        pt: { 
            xs: 11, 
            lg: 12 
        }
    },

    gridContainer: {
        bgcolor: '#fff',
        borderRadius: '8px',
        pt: { 
            xs: 2, 
            lg: 4 
        },
        pb: { 
            xs: 9, 
            lg: '10.3rem' 
        }
    },

    detailsGridItem: {
        borderRight: { 
            xs: 'none', 
            lg: '1px solid #F2F2F2' 
        },
        mr: { 
            xs: 0, 
            lg: 1 
        },
        pl: { 
            xs: 1.6, 
            lg: 4 
        },
        pr: { 
            xs: 1.6, 
            lg: 5 
        },
    },

    detailsHeader: {
        color: 'textColor',
        fontWeight: '700',
        mb: 3
    },

    formContainer: { 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 1 
    },

    selectOptionsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },

    priceAndOfferContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2.7,
        width: { 
            sm: '100%', 
            md: '30%' 
        },
    },

    priceError: { 
        color: 'danger', 
        fontSize: '15px', 
        mb: 2 
    },

    switchContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        mt: 1,
        width: { 
            xs: '105%', 
            lg: '100%' 
        }
    },

    switchLabel: {
        alignSelf: 'center',
        color: '#B1B1B1',
        marginBottom: '0.2rem',
        fontSize: '1rem'
    },

    submitButton: {
        color: '#fff',
        borderRadius: '8px',
        fontSize: '18px',
        position: 'absolute',
        left: { 
            xs: 0, 
            lg: 'auto' 
        },
        
        right: { 
            xs: '0', 
            lg: '70px' 
        },
        bottom: { 
            xs: 0, 
            lg: '35px' 
        },
        mb: { 
            xs: 1, 
            lg: 0 
        },
        mx: { 
            xs: 3.5, 
            lg: 0 
        },
        px: { 
            xs: 0, 
            lg: 16 
        },
        '&:hover': {
            cursor: 'pointer'
        }
    },

    inputContainer: { 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative' 
    },

    errorText: { 
        color: '#F77474' ,
        bottom: '-5px', 
        position: 'absolute',
    },

    selectContainer: { 
        width: { 
            xs: '100%',
             md: '48%' 
        } 
    },

    dropzoneGridItem: {
        mx: 'auto',
        position: 'relative',
        px: { 
            xs: 1.6, 
            lg: 0 
        }
    },

    dropzoneTitle: {
        color: 'textColor',
        fontWeight: '700',
        my: { 
            xs: 2,
            lg: 1
        }
    }


}