export const styles = {

    boxContainer: {
        bgcolor: 'lightBg',
        minHeight: '120vh',
        pb: { xs: 4, lg: 10 }
    },

    container: {
        pt: {
            xs: 10,
            lg: 12
        },
        px: {
            xs: 1.2, lg: 0
        }
    },

    pageContainer: {
        bgcolor: '#fff',
        borderRadius: '8px',
        mt: 1.5,
        px: {
            xs: 1,
            lg: 3
        },
        pb: {
            xs: 1.5,
            lg: 18
        }
    },

    emailContainer: {
        bgcolor: '#fff',
        borderRadius: '8px',
        display: 'flex',
        gap: 1,
        pl: 3,
        py: 2
    },

    emailText: {
        alignSelf: 'center',
        color: '#525252',
        fontWeight: '700',
        fontSize: '15px'
    },

    navContainer: {
        display: 'flex',
        gap: {
            xs: 5,
            lg: 3
        },
        justifyContent: {
            xs: 'center',
            lg: 'start'
        },
        pt: 2,
        position: 'relative'
    },

    navText: {
        color: '#B1B1B1',
        fontSize: { xs: '15px', lg: '16px' },
        '&:hover': { cursor: 'pointer' }
    },

    columnReverse: { 
        display: 'flex', 
        flexDirection: 'column-reverse' 
    }

}