import { v2 as cloudinary } from 'cloudinary';
import { Environments } from '../environments';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: Environments.CLOUDINARY_NAME,
      api_key: Environments.CLOUDINARY_API_KEY,
      api_secret: Environments.CLOUDINARY_API_SECRET,
    });
  },
};
