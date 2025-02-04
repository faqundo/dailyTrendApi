import { Request, Response } from "express";
import { Feed } from "../domain/Feed";

export const FeedController = {
  // Obtener todas las noticias
  async index(req: Request, res: Response) {
    try {
      const feeds = await Feed.find().sort({ publishedAt: -1 });
      res.json(feeds);
    } catch (error) {
      res.status(500).json({ message: "Error obteniendo feeds" });
    }
  },

  // Obtener una noticia por ID
  async show(req: Request, res: Response) {
    try {
      const feed = await Feed.findById(req.params.id);
      if (!feed) return res.status(404).json({ message: "Feed no encontrado" });
      res.json(feed);
    } catch (error) {
      res.status(400).json({ message: "Error obteniendo feed" });
    }
  },

  // Crear una nueva noticia
  async create(req: Request, res: Response) {
    try {
      const { title, link, source, publishedAt } = req.body;
      const feed = new Feed({ title, link, source, publishedAt });
      await feed.save();
      res.status(201).json(feed);
    } catch (error) {
      res.status(400).json({ message: "Error creando feed" });
    }
  },

  // Actualizar una noticia
  async update(req: Request, res: Response) {
    try {
      const feed = await Feed.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!feed) return res.status(404).json({ message: "Feed no encontrado" });
      res.json(feed);
    } catch (error) {
      res.status(400).json({ message: "Error actualizando feed" });
    }
  },

  // Eliminar una noticia
  async destroy(req: Request, res: Response) {
    try {
      const feed = await Feed.findByIdAndDelete(req.params.id);
      if (!feed) return res.status(404).json({ message: "Feed no encontrado" });
      res.json({ message: "Feed eliminado correctamente" });
    } catch (error) {
      res.status(400).json({ message: "Error eliminando feed" });
    }
  },
};
