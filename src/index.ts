import express, { Request, Response } from 'express';
import { connectDB } from "./infrastructure/database.ts";
import { scrapeNews } from './infrastructure/FeedScraper.ts';
import errorHandler from './utils/middlewares/error.middleware.ts';
import FeedController from './interfaces/controllers/FeedController.ts';

const app = express();
app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

// Rutas API usando el estándar CRUD
app.get("/feeds", FeedController.index);
app.get("/feeds/:id", FeedController.show);
app.post("/feeds", FeedController.create);
app.put("/feeds/:id", FeedController.update);
app.delete("/feeds/:id", FeedController.destroy);

app.post("/scrape", FeedController.scrape);

app.use(errorHandler);

// Iniciar el servidor solo si no estamos en modo de prueba
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
}

export default app;