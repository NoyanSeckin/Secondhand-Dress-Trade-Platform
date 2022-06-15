export const styles = {

    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFF', 
        boxShadow: '0px 3px 12px #1E36480A', 
        borderRadius: '8px',
        width: '100%',
        maxWidth: '600px',
        p: {
            xs: '2rem 2.3rem',
            md: '5rem 2.5rem',
        }
    },

    authForm: {
        width: '80%',
	    maxWidth: '450px',
    },

    header: {
        fontWeight: 'bold'
    },

    intro: {
        color: 'textColor', 
        mb: {
            xs: 3.5 , 
            lg: 8
        }
    },

    submitButton: {
        borderRadius: '8px', 
        color: '#fff', 
        fontWeight: 'bold', 
        fontSize: '18px', 
        mt: 1.5, 
        mb: 4, 
        py: 1 ,
        textTransform: 'none', 
        '&:hover': {
            bgcolor: 'primary.main'
        }
    },

    forgotPassword: {
        alignSelf: 'end', 
        fontSize: '12px', 
        color: '#B1B1B1', 
        mb: {
            xs: 0,
            lg: 1.5
        },
         position: 'relative',
         '&:hover': {
            cursor: 'pointer'
         }
    }

}