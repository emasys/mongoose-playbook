import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import log from 'fancy-log';

dotenv.config();

const db = process.env.MONGO_DB_URL;

export const setConnection = () => mongoose.connect(db);

mongoose.connection.on('error', (err) => {
  log('could not connect');
  return log(err);
});

mongoose.connection.on('open', () => {
  log('db connected');
});

export const signToken = data =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
