import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import AuthService from './service/auth_service';
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/ImageFileInput';

const authService = new AuthService();
const imageUplodaer = new ImageUploader();
const FileInput = props => (<ImageFileInput {...props} imageUploader={imageUplodaer}/>)

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} FileInput={FileInput}/>
  </React.StrictMode>,
  document.getElementById('root')
);
