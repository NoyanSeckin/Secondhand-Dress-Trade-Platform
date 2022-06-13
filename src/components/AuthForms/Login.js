import { React, useContext, useState } from 'react';

import axios from 'axios';

import {useNavigate} from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import { setAuthCookieAndContext } from './Utils';
import Form from './Form';

 export default function Login({ setAuthType }) {
  
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
    type: 'login',
    header: 'Giriş Yap',
    intro: 'Fırsatlardan yararlanmak için giriş yap!',
    btnText: 'Giriş Yap',
    accountInfo: 'Hesabın yok mu?',
    action: 'Üye Ol',
  }
  
  return (
    <>
      <Form authForm={loginForm} submitAction={loginUser} setAuthType={setAuthType} isAlert={isAlert} setIsAlert={setIsAlert}/>
    </>
  )
}