import {createTheme} from '@mui/material/styles'

export const globalTheme = createTheme({
  palette: {
    primary: {main: '#4B9CE2'},
    danger: '#F77474',
    orange: '#FAAD60',
    green: '#46AF32',
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
    h4: {
      fontSize: '2rem'
    }
  },
  Button: {
    '&:hover': {
      backgroundColor: 'primary.main'
    }
  }
})