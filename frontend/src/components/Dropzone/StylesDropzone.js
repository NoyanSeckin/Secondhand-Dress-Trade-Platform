export const styles = {
    
    container: {
        py: {xs: 1, lg: 1.5}
    },

    header: {
        color: '#525252', 
        fontWeight: '600',
        display: {xs: 'none', lg: 'block'}
    },
    
    xsDisplayNone: {
        display: {
            xs: 'none', lg: 'block'
        }
    },

    bottomText: {
        color: '#B1B1B1', 
        fontSize: {
            xs: '12px', 
            lg: '14px'
        }
    },

    progressBarContainer: {
        height: '137px', 
        justifyContent: 'center'
    },

    imgContainer: {
        borderRadius: '50%', 
        background: '#3E3E3E', 
        color: '#fff', 
        fontSize: '12px', 
        left: '105px', 
        position: 'absolute', 
        top: '17px', 
        zIndex: 3, 
        '&:hover': {
            cursor: 'pointer'
        }
    }
}