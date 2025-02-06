import { connectMongo, closeMongo, clearMongo } from './setupMongo';

beforeAll(async () => {
  await connectMongo();
});

afterEach(async () => {
  await clearMongo();
});

afterAll(async () => {
  await closeMongo();
});