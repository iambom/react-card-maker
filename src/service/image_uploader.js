import { cloneElement } from "react";

const cloudName = process.env.REACT_APP_CLOUD_NAME;
const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;

class ImageUploader {

    async upload(file) {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', uploadPreset );
        const result = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
            {
                method: 'POST',
                body: data,
            }
        );
        return await result.json();
    }
}

export default ImageUploader;