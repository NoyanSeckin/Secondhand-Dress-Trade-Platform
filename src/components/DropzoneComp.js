import {Typography} from '@mui/material'
import {useDropzone} from 'react-dropzone';

import React, {useEffect, useState} from 'react';
import CloudIcon from '../constants/icons/CloudIcon'
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: '100px',
};


export default function DropzoneComp({setSelectedFile}) {
  const [files, setFiles] = useState([]);
  useEffect(()=> {
    console.log(files)
  }, [files])
  const {getRootProps, getInputProps, open} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
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
        <button type="button" className='dropzone-button' onClick={open}>Görsel Seçin</button>
        <Typography sx={{color: '#B1B1B1', fontSize: '14px'}}>
          PNG ve JPEG Dosya boyutu: max. 400kb
        </Typography>
      </div>
      :
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>}
    </section>
  );
}