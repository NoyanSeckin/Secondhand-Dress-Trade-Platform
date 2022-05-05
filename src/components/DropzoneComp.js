import {Typography} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import {useDropzone} from 'react-dropzone';

import React, {useEffect, useState} from 'react';
import CloudIcon from '../constants/icons/CloudIcon'

export default function DropzoneComp({setSelectedFile}) {
  const [files, setFiles] = useState([]);

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      setSelectedFile(files);
    }
  });
  
  const thumbs = files.map(file => (
    <div  key={file.name}>
      <div>
        <img
          src={file.preview}
          className='dropzone-image'
          alt=''
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container">
     { files?.length === 0 ? 
     <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <CloudIcon/>
        <Typography sx={{color: '#525252', fontWeight: '600'}}>Sürükleyip bırakarak yükle</Typography>
        <span>veya</span>
        <button type="button" className='dropzone-button'>Görsel Seçin</button>
        <Typography sx={{color: '#B1B1B1', fontSize: '14px'}}>
          PNG ve JPEG Dosya boyutu: max. 400kb
        </Typography>
      </div>
      :
      <aside style={{position: 'relative'}} >
        {thumbs}
        <CloseIcon sx={{position: 'absolute', zIndex: 3, top: '17px', left: '105px', fontSize: '12px', color: '#fff', background: '#3E3E3E', borderRadius: '50%', '&:hover': {cursor: 'pointer'}}}/>
      </aside>}
    </section>
  );
}