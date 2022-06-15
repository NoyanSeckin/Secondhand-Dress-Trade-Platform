export const styles = {
    
    card:  {
        borderRadius: '8px',
        p: 1,
        pb: {
            xs: 2, 
            xl: 1
        },
        '&:hover': {
            cursor: 'pointer'
        }
    },

    cardImage: {
        borderRadius: '8px',
        width: {
            xs: '157px',
            lg: '260px',
        }, 
        height: {
            xs: '184px', 
            lg: '297px'
        }, 
    },

    cardContent: {
        display: 'flex', 
        justifyContent: 'space-between', 
        flexDirection: {
            xs: 'column', 
            lg: 'row', 
        } ,
        height: '40px',
        p: 0, 
        pl: 1, 
        mt: 0.5, 
    },

    brandText: {
        color: 'primary.main', 
        fontWeight: '700'
    },

    colorText:{
        fontWeight: '700', 
        fontSize: {
            xs: '12px', 
            lg: '14px'
        }
    },

    colorSpan: {
        fontWeight: 'normal',
        marginLeft: '4px'
    },

    priceText: {
        fontWeight: 'bold',
         mt: {
            xs: 0.7, 
            xl: 2
        }
    },

}