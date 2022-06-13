import React from 'react';

import {Box, Button, Typography} from '@mui/material'

import { Formik} from 'formik';
import * as Yup from 'yup';

import Alert from '../Alert/Alert'

const Form = ({ authForm, submitAction, setAuthType, isAlert, setIsAlert }) => {

    const yupObject = {
        email: Yup.string().email().required('Geçersiz bir email girdiniz.'),
        password: Yup.string().min(8, 'Şifreniz en az 8 karaterden oluşmalı.').max(20, 'Şifreniz en fazla 20 karakterden oluşmalı.').required('Lütfen bir şifre giriniz'),
     }

     const renderForgotPassword = () => {

        if(authForm.type === 'signup'){

            return(
              <Typography sx={{alignSelf: 'end', fontSize: '12px', color: '#B1B1B1', mb: {xs: 0,lg: 1.5}, position: 'relative'}}>
                 Şifremi Unuttum  
              </Typography>
            )
        }
     }
    
    const renderFormContent = (values, errors, handleChange) => {

        const forgotPasswordView = renderForgotPassword();

        return(
            <Box sx={{display: 'flex', flexDirection: 'column', }}>

              <label htmlFor='email'>Email</label>
              <input className={errors.email && 'form-error'} type="email" id='email' value={values.email} onChange={handleChange} placeholder='Email@example.com' />
              
              <label htmlFor='password'>Şifre</label>
              <input className={(errors.password) && 'form-error'} type="password" id='password' value={values.password} onChange={handleChange} />
             
             {forgotPasswordView}

              <Button type='submit' variant='contained' 
              sx={
                {textTransform: 'none', color: '#fff', mt: 1.5, mb: 4, py: 1 ,borderRadius: '8px', fontWeight: 'bold', fontSize: '18px', '&:hover': {
                  backgroundColor: '#4B9CE2'
                }}
                }
                // onClick={()=> {(errors.email || errors.password) && sendAlert()}}
                >
                    {authForm.btnText}
               </Button> 
            </Box>
        )

    }

    function  renderForm() {

        return(
       <Formik 
        initialValues={{
            email: '',
            password: '',
        }}

        validationSchema={
            Yup.object(yupObject)
        }
        
        onSubmit={(values) => {
            console.log('submit');
            submitAction(values.email, values.password)
           
        }}
        >
            {({values, errors, handleSubmit, dirty, handleChange}) => (
                // <form onSubmit={handleSubmit} style={{width: `${width < 400 ? '115%' : '80%'}
                <form onSubmit={handleSubmit}>
                    {renderFormContent(values, errors, handleChange)}
                </form>
            )}
        
        </Formik>
        )
    }

    const renderFormHeader = () => {
        
        return(
            <Typography variant='h4' sx={{fontWeight: 'bold'}}> 
                {authForm.header} 
            </Typography>
        )
    } 

    const renderFormIntro = () => {
        
        return(
            <Typography variant='subtitle1' sx={{color: '#525252', mb: {xs: 3.5 , lg: 8}}}>
                 {authForm.intro}
             </Typography>
        )
    }

    const renderChangeAuthType = () => {

        return (
            <Typography sx={{color: '#525252'}}>
            {authForm.accountInfo}
            
                <span className='auth-action-span' style={{marginLeft:  '0.3rem' }} onClick={()=> setAuthType(authForm.type)} >  
                    {authForm.action}
                </span>
                
            </Typography>
        )
    }

    const headerView = renderFormHeader();
    const introView = renderFormIntro();
    const formView = renderForm();
    const authTypeView = renderChangeAuthType();

    return (
        // ${width < 400 && 'form-container-mobile'}
        <Box className='form-container'>
            <Alert isAlert={isAlert} setIsAlert={setIsAlert}/>
            {headerView}
            {introView}
            {formView}
            {authTypeView}
          </Box>
    );
}

export default Form;
