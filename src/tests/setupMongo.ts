import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

export const connectMongo = async () => {
  if (mongoose.connection.readyState === 0) { // Verifica si no hay conexión activa
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
    console.log('Conectado a MongoDB en memoria');
  }
};

export const closeMongo = async () => {
  if (mongoose.connection.readyState !== 0) { // Verifica si hay una conexión activa
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
    console.log('Desconectado de MongoDB en memoria');
  }
};

export const clearMongo = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }

  console.log('Base de datos limpia');
};