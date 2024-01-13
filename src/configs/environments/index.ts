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
};
