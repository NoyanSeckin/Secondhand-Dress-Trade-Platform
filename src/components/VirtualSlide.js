import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Typography} from '@mui/material'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';

export default function VirtualSlide({display, activeNav, setActiveNav, setSelectedCategory}){

  return (
    <Swiper style={{height: '40px'}} 
    modules={[Virtual]} spaceBetween={0} slidesPerView={5} virtual>
      {display.map((link, index) => (
        <SwiperSlide key={link} virtualIndex={index}>
          <Typography className={`${activeNav === link && 'active-nav'}`} 
          sx={{
             color: '#525252',
             fontSize: '18px',
             fontWeight: 600, 
             '&:hover':{cursor: 'pointer'}
            }} 
           onClick={()=> {setActiveNav(link); setSelectedCategory(index - 1)}}>{link}</Typography>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};