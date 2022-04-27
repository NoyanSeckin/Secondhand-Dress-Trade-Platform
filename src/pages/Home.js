import {Container, Box, Typography} from '@mui/material'

import {React, useState} from 'react'
import Navbar from '../components/Navbar'
import CardComp from '../components/CardComp'
import dummyData from '../constants/dummyData.json'
export default function Home() {
  console.log(dummyData)
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
  function renderCards(){
    return dummyData.data.map(card => {
      return(
        <CardComp brand={card.brand} color={card.color} price={card.price} image={require('../images/dummy-image0.png')}/>
      )
    })
  }
  return (
    <Box sx={{background: '#F2F2F2'}}>
      <Navbar/>
      <Container maxWidth='xl' sx={{pt: 12}}>
        <img className='main-header' src={require('../images/main-header.png')} alt="" />
        <Box sx={{position: 'relative'}}>
          <Box sx={{display: 'flex',  width: '103.5%', mt: 2.5}}>
            {renderMiddleNavbar()}
          </Box>
        <hr className='home-hr'/>
        </Box>
      <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 3.5, mt: 4, width: '103.5%'}}>
        {renderCards()}
      </Box>
      </Container>
    </Box>
  )
}
