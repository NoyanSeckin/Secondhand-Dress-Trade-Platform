import React, { useContext } from 'react';

import { Box, Button, Typography } from '@mui/material'

import { Formik } from 'formik';
import * as Yup from 'yup';

import AuthTypeContext from '../../contexts/AuthTypeContext'
import { styles } from './StylesForm'
import Alert from '../Alert/Alert'

const Form = ({ authForm, submitAction, isAlert, setIsAlert }) => {

    const { setAuthType } = useContext(AuthTypeContext);

    const renderForgotPassword = () => {

        if (authForm.changeTo === 'register') {

            return (
                <Typography sx={styles.forgotPassword}>
                    Şifremi Unuttum
                </Typography>
            )
        }
    }

    const renderFormContent = (values, errors, handleChange) => {

        const forgotPasswordView = renderForgotPassword();

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', }}>

                <label htmlFor='email'>Email</label>
                <input className={errors.email && 'form-error'} type="email" id='email' value={values.email} onChange={handleChange} placeholder='Email@example.com' />
                <span style={{...styles.errorMessageSpan, marginBottom: '5px'}}>{errors.email}</span>

                <label htmlFor='password'>Şifre</label>
                <input className={errors.password && 'form-error'} type="password" id='password' value={values.password} onChange={handleChange} />
                <span style={{...styles.errorMessageSpan, marginTop: '4px'}}>{errors.password}</span>

                {forgotPasswordView}

                <Button type='submit' variant='contained'
                    sx={styles.submitButton}>
                    {authForm.btnText}
                </Button>
            </Box>
        )

    }

    const yupObject = {
        email: Yup.string().email('Geçersiz bir email girdiniz.').required('Email boş bırakılamaz.'),
        password: Yup.string().min(8, 'Şifreniz en az 8 karaterden oluşmalı.').max(20, 'Şifreniz en fazla 20 karakterden oluşmalı.').required('Şifre giriniz'),
    }

    function renderForm() {

        return (
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
                {({ values, errors, handleSubmit, dirty, handleChange }) => (

                    <form style={styles.authForm} onSubmit={handleSubmit}>
                        {renderFormContent(values, errors, handleChange)}
                    </form>
                )}

            </Formik>
        )
    }

    const renderHeader = () => {

        return (
            <Typography variant='h4' sx={styles.header}>
                {authForm.header}
            </Typography>
        )
    }

    const renderIntro = () => {

        return (
            <Typography variant='subtitle1' sx={styles.intro}>
                {authForm.intro}
            </Typography>
        )
    }

    const renderChangeAuthType = () => {

        return (
            <Typography sx={{ color: 'textColor' }}>
                {authForm.accountInfo}

                <span className='auth-action-span' style={{ marginLeft: '0.3rem' }} onClick={() => setAuthType(authForm.changeTo)} >
                    {authForm.action}
                </span>

            </Typography>
        )
    }

    const headerView = renderHeader();
    const introView = renderIntro();
    const formView = renderForm();
    const authTypeView = renderChangeAuthType();

    return (
        <Box sx={styles.formContainer}>
            <Alert isAlert={isAlert} setIsAlert={setIsAlert} alertText={authForm.errorMessage} alertType={'warning'}/>
            {headerView}
            {introView}
            {formView}
            {authTypeView}
        </Box>
    );
}

export default Form;
