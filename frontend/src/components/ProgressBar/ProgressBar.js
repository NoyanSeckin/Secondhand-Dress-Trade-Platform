import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography'

import { styles } from './StylesProgressBar'

export default function ProgressBar() {

    const [progress, setProgress] = useState(0);

    useEffect(() => {

        const timer = setInterval(() => {

            setProgress((oldProgress) => {

                const diff = Math.random() * 10;

                return Math.min(oldProgress + diff, 100);
            });

        }, 60);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={styles.container}>

            <Typography sx={{ color: 'textColor' }}>
                %{Math.round(progress)}
            </Typography>

            <LinearProgress variant="determinate" value={progress} sx={styles.progressBar} />

            <Typography sx={styles.loadingText}>
                Yükleniyor
            </Typography>

        </Box>
    );
}
