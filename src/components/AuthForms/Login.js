import { React, useContext, useState } from 'react';

import axios from 'axios';

import {useNavigate} from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import { setAuthCookieAndContext } from './Utils';
import Form from './Form';

 export default function Login() {
  
  const [ isAlert, setIsAlert ] = useState(false);

  const navigate = useNavigate();

  const {setUserAuth} = useContext(UserContext);

  async function loginUser(email, password){
    axios.post('https://bootcamp.akbolat.net/auth/local', {
      identifier: email,
      password: password
    })
    .then(
      response =>{ 
        setAuthCookieAndContext(email, response.data.jwt, response.data.user.id, setUserAuth);
          navigate('/home');
      }
  )
  .catch(
      () => setIsAlert(true)
  )
  }

  const loginForm = {
    header: 'Giriş Yap',
    intro: 'Fırsatlardan yararlanmak için giriş yap!',
    btnText: 'Giriş Yap',
    accountInfo: 'Hesabın yok mu?',
    action: 'Üye Ol',
    changeTo: 'register',
  }
  
  return (
    <>
      <Form authForm={loginForm} submitAction={loginUser} isAlert={isAlert} setIsAlert={setIsAlert}/>
    </>
  )
}