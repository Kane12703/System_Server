// cloudinary.service.ts

import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import { Environments } from '../environments';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadFile(
    file: Express.Multer.File,
    folder: string = Environments.FOLDER_CLOUDINARY,
  ): Promise<CloudinaryResponse> {
    const options: UploadApiOptions = {
      folder: folder,
      timestamp: Math.floor(Date.now() / 1000),
      unique_filename: true,
    };
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) return reject(new BadRequestException(error.message));
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
  async deleteFileImage(publicId: string): Promise<CloudinaryResponse> {
    return new Promise((resolve, rejects) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (result) {
          resolve(result);
        } else {
          rejects(new BadRequestException(error.message));
        }
      });
    });
  }
}
