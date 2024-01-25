import * as dotenv from 'dotenv';

// config use env
dotenv.config();

// postgres
const POSTGRES_USER: string = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD;
const POSTGRES_DB: string = process.env.POSTGRES_DB;
const POSTGRES_HOST: string = process.env.POSTGRES_HOST;
const POSTGRES_PORT: number = +process.env.POSTGRES_PORT;
// jwt
const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION_TIME: string =
  process.env.ACCESS_TOKEN_EXPIRATION_TIME;
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRATION_TIME: string =
  process.env.REFRESH_TOKEN_EXPIRATION_TIME;

const MAIL_HOST: string = process.env.MAIL_HOST;
const MAIL_USER: string = process.env.MAIL_USER;
const MAIL_PASSWORD: string = process.env.MAIL_PASSWORD;
const MAIL_FROM: string = process.env.MAIL_FROM;

const CLOUDINARY_NAME: string = process.env.CLOUDINARY_NAME;
const CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET: string = process.env.CLOUDINARY_API_SECRET;
const FOLDER_CLOUDINARY: string = process.env.FOLDER_CLOUDINARY;
export const Environments = {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  ACCESS_TOKEN_EXPIRATION_TIME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_SECRET,
  MAIL_FROM,
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_USER,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  FOLDER_CLOUDINARY,
  CLOUDINARY_API_SECRET,
};
