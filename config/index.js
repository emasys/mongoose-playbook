import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const db = process.env.MONGO_DB_URL;

export const setConnection = () => mongoose.connect(db);

export const signToken = data =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
