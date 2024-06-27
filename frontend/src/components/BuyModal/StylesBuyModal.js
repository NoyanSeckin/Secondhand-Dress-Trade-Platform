export const styles = {

    modalStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '355px',
        height: '171px',
        bgcolor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 3px 12px #1E36482E',
        textAlign: 'center',
        zIndex: 33,
    },

    modalTitle: {
        fontWeight: '700',
        fontSize: '25px',
        mt: 2.5
    },

    modalText: {
        color: '#555555',
        my: 1.7,
    },

    button: {
        fontSize: '18px',
        fontWeight: '700',
        borderRadius: '8px',
        px: 5,
    },

    cancelButton: {
        color: 'primary',
        background: '#f0f8ff',
        mr: 1
    },

    proceedButton: {
        color: '#fff',
        bgcolor: 'primary.main',
        '&:hover': {
            bgcolor: 'primary.main'
        }
    }
}