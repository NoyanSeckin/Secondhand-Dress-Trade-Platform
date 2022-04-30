import {Box, Typography, Button} from '@mui/material'
import { Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


import {React, useState, useEffect, useContext} from 'react'
import UserToken from '../contexts/UserToken';
import Alert from '../components/Alert'

 export default function LoginSignup(props) {
         // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      // navigate(from, { replace: true });

       // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    // return <Navigate to="/login" state={{ from: location }} replace />;
   const userToken = useContext(UserToken);

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
      document.cookie = response.data.jwt;
      console.log(document.cookie);
      directHome();
    })
    .catch((error)=> {console.log(error); sendAlert(); })
   }

   async function loginUser(email, password){
     axios.post('https://bootcamp.akbolat.net/auth/local', {
       identifier: email,
       password: password
     }).then(data => {
       console.log(data.jwt)
      document.cookie = data.jwt;
      directHome() 
     }).catch(err => {sendAlert(); console.log(err)})

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
    btnText: 'Giriş',
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
      onSubmit={(values, {setErrors}) => {
        console.log()
        if(!isLogin){
          registerUser(values.email ,values.email, values.password)
        }else if(isLogin){
          loginUser(values.email, values.password);
        }
      }}
      >
        {({values, errors, handleSubmit, dirty, handleChange}) => (
          <form onSubmit={handleSubmit} style={{width: '80%'}}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
              <label htmlFor='email'>Email</label>
              <input className={errors.email && 'form-error'} type="email" id='email' value={values.email} onChange={handleChange} placeholder='Email@example.com' />
              <label htmlFor='password'>Şifre</label>
              <input className={(errors.password) && 'form-error'} type="password" id='password' value={values.password} onChange={handleChange} />
              {!isLogin && <Typography sx={{alignSelf: 'end', fontSize: '12px', color: '#B1B1B1', mb: 1.5}}>Şifremi Unuttum</Typography>}
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