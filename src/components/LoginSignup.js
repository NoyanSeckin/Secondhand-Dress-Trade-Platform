import {Box, Typography, Button} from '@mui/material'
import { Formik} from 'formik';
import * as Yup from 'yup';

import {React, useState} from 'react'
import Alert from '../components/Alert'

export default function LoginSignup() {
  const [isAlert, setIsAlert] = useState(false)
  // if login false show register page, else login page
  const [loginStatus, setLoginStatus] = useState(false);
  const register = {
    header: 'Üye OI',
    intro: 'Fırsatlardan yararlanmak için üye ol!',
    btnText: 'Üye OI',
    accountInfo: 'Hesabın var mı? ',
    action: 'Giriş yap'
  }
  const login = {
    header: 'Giriş Yap',
    intro: 'Fırsatlardan yararlanmak için giriş yap!',
    btnText: 'Giriş',
    accountInfo: 'Hesabın yok mu?',
    action: 'Üye Ol'
  }
  function returnEither(register, login){
    return loginStatus ? login : register;
  }
  return (
    <Box className='form-container'>
      <Alert isAlert={isAlert}/>
      <Typography variant='h4' sx={{fontWeight: 'bold'}}> {returnEither(register.header, login.header)} </Typography>
      <Typography variant='subtitle1' sx={{color: '#525252', mb: 8}}>{returnEither(register.intro, login.intro)}</Typography>
      <Formik initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={
        Yup.object({
          email: Yup.string().email('Emailiniz veya şifreniz hatalı.').required('Geçersiz bir email girdiniz.'),
          password: Yup.string().min(8, 'Şifreniz en az 8 karaterden oluşmalı.').max(20, 'Şifreniz en fazla 20 karakterden oluşmalı.').required('Lütfen bir şifre giriniz'),
        })
      }
      onSubmit={(values, errors, {resetForm}) => {
        console.log(errors)
      }}
      >
        {({values, errors, handleSubmit, dirty, handleChange}) => (
          <form onSubmit={handleSubmit} style={{width: '80%'}}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
              <label htmlFor={values.email}>Email</label>
              <input type="email" id='email' value={values.email} onChange={handleChange} placeholder='Email@example.com' />
              <label htmlFor={values.password}>Şifre</label>
              <input type="password" id='password' value={values.password} onChange={handleChange} />
              <Button type='submit' variant='contained' 
              sx={
                {textTransform: 'none', color: '#fff', mt: 1.5, mb: 4, py: 1 ,borderRadius: '8px', fontWeight: 'bold', fontSize: '18px', '&:hover': {
                  backgroundColor: '#4B9CE2'
                }}
                }>{returnEither(register.btnText, login.btnText)}</Button>
             
            </Box>
          </form>
        )}
      </Formik>
      <Typography sx={{color: '#525252'}}>{returnEither(register.accountInfo, login.accountInfo)} <Typography style={{marginLeft: `${loginStatus === true ? '0.3rem' : 0}`}} onClick={()=> setLoginStatus(!loginStatus)} sx={{display: 'inline', color: 'primary.main', fontWeight: '700', '&:hover': {
        cursor: 'pointer'
      }}}>{returnEither(register.action, login.action)}</Typography></Typography>
    </Box>
  )
}
