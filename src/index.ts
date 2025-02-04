import express, { Request, Response } from 'express';
import { connectDB } from "./infrastructure/database.ts";
import { scrapeNews } from './infrastructure/FeedScraper.js';
import errorHandler from './utils/middlewares/error.middleware';
import FeedController from './interfaces/FeedController';

const app = express();
app.use(express.json());

connectDB();

// Rutas API usando el estándar CRUD
app.get("/feeds", FeedController.index);
app.get("/feeds/:id", FeedController.show);
app.post("/feeds", FeedController.create);
app.put("/feeds/:id", FeedController.update);
app.delete("/feeds/:id", FeedController.destroy);

app.get("/scrape", async (_: Request, res: Response) => {
    try {
      await scrapeNews();
      res.json({ message: "Scraping con Puppeteer completado" });
    } catch (error) {
      console.error("Error en el scraping:", error);
      res.status(500).json({ message: "Error en el scraping" });
    }
  });

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));