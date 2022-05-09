import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useWindowSize } from "@react-hook/window-size/throttled";

import React from 'react';

export default function Variants() {
  const [width] = useWindowSize({ fps: 60 });

  function renderSkeleton(){
    if(width > 1550){
      return(
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width={250} height={300} />
        <Skeleton variant="text" width={250} />
        <Skeleton variant="circular" width={40} height={40} />
      </Stack>
      )
    }else{
      return(
       <Stack spacing={1}>
        <Skeleton variant="rectangular" width={160} height={170} />
        <Skeleton variant="text" width={160} />
        <Skeleton variant="text" width={160} />
        <Skeleton variant="circular" width={40} height={40} />
      </Stack>
      )
    }
  }
  return (
   <div>
     {renderSkeleton()}
   </div>
  );
}
