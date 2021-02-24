import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import AuthService from './service/auth_service';
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/ImageFileInput';

const authService = new AuthService();
// // const imageUploadParams = ({
// //   cloudName : process.env.REACT_APP_CLOUD_NAME,
// //   uploadPreset : process.env.REACT_APP_UPLOAD_PRESET,
// // });
// const cloudName = process.env.REACT_APP_CLOUD_NAME;
const imageUplodaer = new ImageUploader();
const FileInput = props => (<ImageFileInput {...props} imageUploader={imageUplodaer}/>)

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} FileInput={FileInput}/>
  </React.StrictMode>,
  document.getElementById('root')
);
