import {createTheme} from '@mui/material/styles'

export const globalTheme = createTheme({
  palette: {
    primary: {main: '#4B9CE2'},
    danger: '#F77474',
    orange: '#FAAD60',
    green: '#46AF32',
  },
  components:{
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: '#4B9CE2',
          opacity: 0.7,
        }
      }
    }
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
    h3: {
      fontSize: '2.125rem'
    },
    h4: {
      fontSize: '2rem'
    },
    h6: {
      fontSize: '1.125rem'
    }

  },
  Button: {
    '&:hover': {
      backgroundColor: 'primary.main'
    }
  }
})