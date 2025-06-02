import crypto from 'crypto';
import { Request } from 'express';
import multer from 'multer';
import path from 'path';

export const UPLOAD_DIR = path.resolve(__dirname, '..', '..', 'data', 'imagens-postagens');

export const createMulterConfig = () => {
  const storage = multer.diskStorage({
      destination: (request, file, callback) => {
          callback(null, UPLOAD_DIR);
      },
      filename(request, file, callback) {
          crypto.randomBytes(6, (err, hash) => {
              if (err) {
                  callback(err, 'erro');
              } else {
                  const filename = `${hash.toString('hex')}-${file.originalname}`;
                  callback(null, filename);
              }
          });
      }
  });

  const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
      const allowedMimes = [
          'image/jpeg',
          'image/pjpeg',
          'image/png',
          'image/gif',
      ];

      if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
      } else {
          cb(new Error('Tipo de arquivo inválido'));
      }
  };

  return {
      dest: UPLOAD_DIR,
      storage,
      fileFilter,
      limits: {
          fileSize: 4 * 1024 * 1024
      }
  };
};