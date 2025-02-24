const cloudinary = require('cloudinary');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Cloudinary configuration
const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: process.env.CLOUDINARY_SECURE === 'true',
};
const cloudinaryPublicFolderName = 'products';
const imageFolderName = 'images';

// Cloudinary instance
const cloudinaryInstance = cloudinary.v2;
cloudinaryInstance.config(cloudinaryConfig);

// Upload image
const uploadImage = async (image) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: cloudinaryPublicFolderName,
  }

  try {
    return cloudinaryInstance.uploader.upload(image, options).catch((error) => {
      console.error(error);
      return null;
    });
  } catch (error) {
    console.error(error);
  }
}

const listImageFiles = (directoryPath) => {
  try {
    const files = fs.readdirSync(directoryPath);
    const filePaths = files.map(file => path.join(directoryPath, file));
    return filePaths;
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
}

const imageFiles = listImageFiles(path.join(__dirname, imageFolderName));

imageFiles.forEach(async (imageFile) => {
  const result = await uploadImage(imageFile);
  console.log(result);
});
