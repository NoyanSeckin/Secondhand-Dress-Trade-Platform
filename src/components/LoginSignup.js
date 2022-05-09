import {Box, Typography, Button} from '@mui/material'
import { Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useWindowSize } from "@react-hook/window-size/throttled";

import {React, useState, useEffect, useContext} from 'react'
import UserContext from '../contexts/UserContext';
import WarnAlert from './WarnAlert'
import EyeIcon from '../constants/icons/EyeIcon'

 export default function LoginSignup({mobileScreen}) {
   const {setUserAuth} = useContext(UserContext);
   
  const [width] = useWindowSize({ fps: 60 });
  let navigate = useNavigate();
  const [isAlert, setIsAlert] = useState(false)
  // if false show register page, else login page
  const [isLogin, setIsLogin] = useState(false);

  async function registerUser(username, email, password){
    axios.post('https://bootcamp.akbolat.net/auth/local/register',{
      username,
      email,
      password
    })
    .then((response)=> {
      console.log(response.data.user.id)
      setAuthCookieAndState(email, response.data.jwt, response.data.user.id);
      // directHome();
    })
    .catch((error)=> sendAlert())
   }

   async function loginUser(email, password){
     axios.post('https://bootcamp.akbolat.net/auth/local', {
       identifier: email,
       password: password
     }).then(response => {
       
       setAuthCookieAndState(email, response.data.jwt, response.data.user.id);
       directHome();
     }).catch(err => sendAlert())

   }
   function setAuthCookieAndState(email, token, id){
      document.cookie = `email = ${email}`; 
      document.cookie = `token = ${token}`;
      document.cookie = `id = ${id}`
      const initialValue = {};
      const userInfo = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: value}), initialValue);
      setUserAuth({email: userInfo.email, token: userInfo.token, id: userInfo.id});
   }
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
    btnText: 'Giriş Yap',
    accountInfo: 'Hesabın yok mu?',
    action: 'Üye Ol',
  }
  function returnEither(register, login){
    return isLogin ? login : register;
  }

  function directHome(){
    navigate('/home');
  }
  
  function sendAlert(){
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  }

  return (
    <Box className={` form-container ${width < 400 && 'form-container-mobile'}`}>
      <WarnAlert isAlert={isAlert} screen={width}/>
      <Typography variant='h4' sx={{fontWeight: 'bold'}}> {returnEither(register.header, login.header)} </Typography>
      <Typography variant='subtitle1' sx={{color: '#525252', mb: {xs: 3.5 , lg: 8}}}>{returnEither(register.intro, login.intro)}</Typography>
      <Formik initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={
        Yup.object({
          email: Yup.string().email().required('Geçersiz bir email girdiniz.'),
          password: Yup.string().min(8, 'Şifreniz en az 8 karaterden oluşmalı.').max(20, 'Şifreniz en fazla 20 karakterden oluşmalı.').required('Lütfen bir şifre giriniz'),
        })
      }
      onSubmit={(values, {errors}) => {
        if(!isLogin){
          registerUser(values.email ,values.email, values.password)
        }else if(isLogin){
          loginUser(values.email, values.password);
        }
      }}
      >
        {({values, errors, handleSubmit, dirty, handleChange}) => (
          <form onSubmit={handleSubmit} style={{width: `${width < 400 ? '115%' : '80%'}`}}>
            <Box sx={{display: 'flex', flexDirection: 'column', }}>
              <label htmlFor='email'>Email</label>
              <input className={errors.email && 'form-error'} type="email" id='email' value={values.email} onChange={handleChange} placeholder='Email@example.com' />
              <label htmlFor='password'>Şifre</label>
              <input className={(errors.password) && 'form-error'} type="password" id='password' value={values.password} onChange={handleChange} />
              {isLogin && <Typography sx={{alignSelf: 'end', fontSize: '12px', color: '#B1B1B1', mb: {xs: 0,lg: 1.5}, position: 'relative'}}>Şifremi Unuttum  
              
             {width < mobileScreen && isLogin && <EyeIcon style={{position: 'absolute', bottom: '39px', right: '17px'}}/>}
              
              </Typography>}


              <Button type='submit' variant='contained' 
              sx={
                {textTransform: 'none', color: '#fff', mt: 1.5, mb: 4, py: 1 ,borderRadius: '8px', fontWeight: 'bold', fontSize: '18px', '&:hover': {
                  backgroundColor: '#4B9CE2'
                }}
                }
                onClick={()=> {(errors.email || errors.password) && sendAlert()}}>{returnEither(register.btnText, login.btnText)}</Button> 
            </Box>
          </form>
        )}
      </Formik>
      <Typography sx={{color: '#525252'}}>{returnEither(register.accountInfo, login.accountInfo)} <span className='auth-action-span' style={{marginLeft: `${isLogin === true ? '0.3rem' : 0}`}} onClick={()=> setIsLogin(!isLogin)} >{returnEither(register.action, login.action)}</span></Typography>
    </Box>
  )
}