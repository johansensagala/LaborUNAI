import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Memuat variabel dari .env
dotenv.config();

// Konfigurasi port dan URI mongodb
const port = process.env.PORT || 5000;
const mongodb_uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/labor_unai';

mongoose.connect(mongodb_uri);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Koneksi MongoDB berhasil!');
});

export default {
  port,
  mongodb_uri,
};
