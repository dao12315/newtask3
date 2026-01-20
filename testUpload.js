require('dotenv').config();
const cloudinary = require('./cloudinary.config');

async function uploadImageTest() {
  try {
    const result = await cloudinary.uploader.upload(
      './src/assets/img/google.jpg', // đường dẫn ảnh local
      {
        folder: 'avatars',
      }
    );
    console.log('UPLOAD SUCCESS');
    console.log('URL:', result.secure_url);
  } catch (error) {
    console.error('UPLOAD FAILED');
    console.error(error);
  }
}

uploadImageTest();
