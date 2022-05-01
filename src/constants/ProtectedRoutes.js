import {Outlet} from 'react-router'

import React, {useContext} from 'react'
import UserContext from '../contexts/UserContext'
import Authentication from '../pages/Authentication';

export default function ProtectedRoutes() {
  const {userAuth} = useContext(UserContext);
  return userAuth.token ? <Outlet/> : <Authentication/>
}
