import {Box, Typography, Button} from '@mui/material'
import { Formik} from 'formik';
import * as Yup from 'yup';

import React from 'react'

export default function LoginSignup() {
  
  return (
    <Box className='form-container'>
      <Typography variant='h4' sx={{fontWeight: 'bold'}}>Üye OI</Typography>
      <Typography variant='subtitle1' sx={{color: '#525252', mb: 8}}>Fırsatlardan yararlanmak için üye ol!</Typography>
      <Formik initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={
        Yup.object({
          email: Yup.string().required('Geçersiz bir email girdiniz.'),
          password: Yup.string().min(8, 'Şifreniz en az 8 karaterden oluşmalı.').max(20, 'Şifreniz en fazla 20 karakterden oluşmalı.').required('Lütfen bir şifre giriniz'),
        })
      }
      onSubmit={(values, {resetForm}) => {
        console.log(values)
      }}
      >
        {({values, errors, handleSubmit, dirty, handleChange}) => (
          <form onSubmit={handleSubmit} style={{width: '80%'}}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
              <label htmlFor={values.email}>Email</label>
              <input type="email" id='email' value={values.email} onChange={handleChange} placeholder='Email@example.com' />
              <label htmlFor={values.password}>Şifre</label>
              <input type="password" id='password' value={values.password} onChange={handleChange} />
              <Button variant='contained' 
              sx={
                {textTransform: 'none', color: '#fff', mt: 1.5, mb: 4, py: 1 ,borderRadius: '8px', fontWeight: 'bold', fontSize: '18px'}
                }>Üye OI</Button>
             
            </Box>
          </form>
        )}
      </Formik>
      <Typography sx={{color: '#525252'}}>Hesabın var mı? <Typography sx={{display: 'inline', color: 'primary.main', fontWeight: '700'}}>Giriş yap</Typography></Typography>
    </Box>
  )
}
