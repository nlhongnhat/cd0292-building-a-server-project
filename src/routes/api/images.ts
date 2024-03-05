import express from 'express';
const images = express.Router();
import resizeImage from '../../resize-image';

// Route for image resizing
images.get('/', resizeImage);

export default images;
