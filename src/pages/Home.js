import {Container, Box, Typography} from '@mui/material'

import {React, useState} from 'react'
import Navbar from '../components/Navbar'

export default function Home() {
  const [activeNav, setActiveNav] = useState('Hepsi')
  function renderMiddleNavbar(){
    const navbarItems = ['Hepsi', 'Pantolon', 'Gömlek', 'Tişört', 'Şort', 'Sweatshirt', 'Kazak', 'Polar', 'Mont', 'Abiye', 'Ayakkabı', 'Aksesuar', 'Çanta', 'Triko', 'Diğer'];
    return navbarItems.map(link => {
      return(
        <Box sx={{ flexGrow: 1}}>
           <Box sx={{display: 'flex'}}>
           <Typography className={`${activeNav === link && 'active-nav'}`} sx={{
             fontWeight: 600,color: '#525252','&:hover':{cursor: 'pointer'}}} 
           onClick={()=> setActiveNav(link)}>{link}</Typography>
           </Box>
        </Box>
      )
    }) 
  }
  return (
    <Box sx={{background: '#F2F2F2'}}>
      <Navbar/>
      <Container maxWidth='xl' sx={{pt: 12}}>
        <img className='main-header' src={require('../images/main-header.png')} alt="" />
        <Box sx={{display: 'flex',  width: '103.5%', mt: 2.5}}>
          {renderMiddleNavbar()}
        </Box>
        <hr className='home-hr'/>
      </Container>
    </Box>
  )
}
