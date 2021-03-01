import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import AuthService from './service/auth_service';
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/ImageFileInput';
import CardRepository from './service/card_repository';

const authService = new AuthService();
const cardRepository = new CardRepository();
const imageUplodaer = new ImageUploader();
const FileInput = memo(props => (<ImageFileInput {...props} imageUploader={imageUplodaer}/>));

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} FileInput={FileInput} cardRepository={cardRepository} />
  </React.StrictMode>,
  document.getElementById('root')
);
