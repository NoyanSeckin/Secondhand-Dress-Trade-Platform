export const styles = {

    container: {
        bgcolor: '#fff',
        borderRadius: '10px',
        boxShadow: '0px 3px 12px #1E36482E',
        display: 'flex',
        flexDirection: 'column',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        
        py: {
            xs: 2,
            md: 3
        },

        gap: {
            xs: 1,
            md: 2
        },

        width: {
            xs: '95%', 
            md:'480px'
        },
    },

    img: {
        borderRadius: '8px',
        height: '50px',
        width: '50px',
    },

    ratioWrapper: {
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        height: '45px',
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        '&:hover': { 
            cursor: 
            'pointer' 
        },
    },

    headerContainer: { 
        display: 'flex', 
        justifyContent: 'space-between' 
    },

    headerText: {
        fontSize: { 
            xs: '18px', 
            lg: '25px' 
        },
        fontWeight: '700',
    },

    mainContainer: {
        background: '#f0f8ff',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        p: { 
            xs: 0.5, 
            lg: 1 
        },
        mb: { 
            xs: 1, 
            lg: 0 
        }
    },

    name: {
        ml: 1,
        color: '#555555',
        lineHeight: '20px',
        fontSize: { 
            xs: '13px', 
            lg: '16px' 
        }
    },

    price: {
        color: '#525252',
        fontWeight: '700',
        alignSelf: 'center',
        fontSize: { 
            xs: '15px', 
            lg: '1.125rem' 
        }
    },

    confirmBtn: {
        color: '#fff',
        borderRadius: '8px',
        fontSize: '18px',
        px: { xs: 17, lg: 16 },
        mt: { xs: 1.5, lg: 0 },
        mb: { xs: 1, lg: 0 }
    }


}