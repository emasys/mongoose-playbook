import mongoose from 'mongoose';

const db = 'mongodb://localhost/mongoose-playbook';

export const setConnection = () => mongoose.connect(db);
