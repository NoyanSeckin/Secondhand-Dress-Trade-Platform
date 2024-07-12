import React, { useEffect, useState } from 'react';

import { Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';

import CloudIcon from '../../constants/icons/CloudIcon';
import { ProgressBar } from 'components/progress-bar/ProgressBar';
import { styles } from './StylesDropzone';

export default function DropzoneComp({ setSelectedFile, setSelectedFileError }) {
  const [loader, setLoader] = useState(true);
  const [files, setFiles] = useState([]);
  const validImgTypes = ['image/png', 'image/jpg', 'image/jpeg'];

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      'image/*': [],
    },
    multiple: false,
    noClick: true,
    onDrop: (acceptedFiles) => {
      const acceptedFile = acceptedFiles[0];

      // size check
      if (acceptedFile.size > 400000) {
        setSelectedFileError("Fotoğraf boyutu 400kb'den büyük");
      } else if (validImgTypes.includes(acceptedFile.type)) {
        // activate loader
        setLoader(true);

        // set image preview
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );

        // get the uploaded image
        setSelectedFile(acceptedFile);
        setSelectedFileError('');

        // disable loader
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      } else if (!validImgTypes.includes(acceptedFile)) {
        setSelectedFileError('Lütfen yalnızca jpg veya png formatı yükleyin');
      }
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img
          src={file.preview}
          className="dropzone-image"
          alt=""
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  function handleRemove() {
    setFiles([]);
    setSelectedFile({});
  }

  const renderDropBox = () => {
    return (
      <Box sx={styles.container} {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />

        <CloudIcon />

        <Typography sx={styles.header}>Sürükleyip bırakarak yükle</Typography>

        <Typography sx={styles.xsDisplayNone}>veya</Typography>

        <button type="button" className="dropzone-button" onClick={open}>
          Görsel Seçin
        </button>

        <Typography sx={styles.bottomText}>PNG ve JPEG Dosya boyutu: max. 400kb</Typography>
      </Box>
    );
  };

  const renderProgressBar = () => {
    return (
      <Box className="dropzone" sx={styles.progressBarContainer}>
        <ProgressBar />
      </Box>
    );
  };

  const renderImage = () => {
    return (
      <aside style={{ position: 'relative' }}>
        {thumbs}
        <CloseIcon onClick={handleRemove} sx={styles.imgContainer} />
      </aside>
    );
  };

  function renderPage() {
    if (files.length === 0) {
      const dropBoxView = renderDropBox();
      return dropBoxView;
    } else if (loader) {
      const progressBarView = renderProgressBar();
      return progressBarView;
    } else {
      const imgView = renderImage();
      return imgView;
    }
  }

  const pageView = renderPage();

  return <section className="container">{pageView}</section>;
}
