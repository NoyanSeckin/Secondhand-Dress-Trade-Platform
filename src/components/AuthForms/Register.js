import { React, useContext, useState } from 'react';

import axios from 'axios';

import UserContext from '../../contexts/UserContext';
import { setAuthCookieAndContext } from './Utils';
import Form from './Form';

 export default function Login() {
  
  const [ isAlert, setIsAlert ] = useState(false);

  const {setUserAuth} = useContext(UserContext);

  async function registerUser(email, password){

    axios.post('https://bootcamp.akbolat.net/auth/local/register',{
        username: email,
        email,
        password
      })
      .then((response)=> {
        setAuthCookieAndContext(email, response.data.jwt, response.data.user.id, setUserAuth);
      })
      .catch(() => setIsAlert(true))
   }

   const registerForm = {
     header: 'Üye OI',
     intro: 'Fırsatlardan yararlanmak için üye ol!',
     btnText: 'Üye OI',
     accountInfo: 'Hesabın var mı? ',
     action: 'Giriş yap',
     changeTo: 'login',
     errorMessage: 'Bu email kullanımda'
  }
  
  return (
    <>
      <Form authForm={registerForm} submitAction={registerUser}  isAlert={isAlert} setIsAlert={setIsAlert}/>
    </>
  )
}