import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { styles } from 'components/progress-bar/StylesProgressBar';

export const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const diff = Math.random() * 10;

        return Math.min(prev + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={styles.container}>
      <Typography sx={{ color: 'textColor' }}>%{Math.round(progress)}</Typography>

      <LinearProgress variant="determinate" value={progress} sx={styles.progressBar} />

      <Typography sx={styles.loadingText}>Yükleniyor</Typography>
    </Box>
  );
};
