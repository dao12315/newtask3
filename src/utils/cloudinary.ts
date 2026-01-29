import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../config/cloudinary";


type UploadResponse = {
  secure_url: string;
};

export async function uploadAvatarToCloudinary(uri: string): Promise<string> {
  const formData = new FormData();

  formData.append('file', {
    uri,
    type: 'image/jpeg',
    name: 'avatar.jpg',
  } as any);

  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  // ⚠️ chỉ giữ folder nếu preset cho phép
  formData.append('folder', 'avatars');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    },
  );

  const data: UploadResponse = await response.json();

  if (!data.secure_url) {
    console.log('Cloudinary error response:', data);
    throw new Error('Upload Cloudinary failed');
  }

  return data.secure_url;
}
