import { Request, Response } from "express";
import { FeedModel } from "../domain/Feed";
import { createFeedValidation, updateFeedValidation } from '../../utils/validation/feed.validation';
import { CreateFeedUseCase, UpdateFeedUseCase } from '../../../domain/useCases/feed.useCase';



export const FeedController = {
  // Obtener todas las noticias
  async index(req: Request, res: Response) {
    try {
      const feeds = await FeedModel.find().sort({ publishedAt: -1 });
      res.json(feeds);
    } catch (error) {
      res.status(500).json({ message: "Error obteniendo feeds" });
    }
  },

  // Obtener una noticia por ID
  async show(req: Request, res: Response) {
    try {
      const feed = await FeedModel.findById(req.params.id);
      if (!feed) return res.status(404).json({ message: "Feed no encontrado" });
      res.json(feed);
    } catch (error) {
      res.status(400).json({ message: "Error obteniendo feed" });
    }
  },

  // Crear una nueva noticia
  /* async create(req: Request, res: Response) {
    try {
      const { title, link, source, publishedAt } = req.body;
      const feed = new FeedModel({ title, link, source, publishedAt });
      await feed.save();
      res.status(201).json(feed);
    } catch (error) {
      res.status(400).json({ message: "Error creando feed" });
    }
  }, */

  async create(req: Request, res: Response) {
    try {
      // Validar datos de entrada
      const { error } = createFeedValidation.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Llamar al caso de uso
      const result = await CreateFeedUseCase.execute(req.body);
      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json({ error: 'Error creating feed' });
    }
  },

  // Actualizar una noticia
  async update(req: Request, res: Response) {
    try {
      // Validar datos de entrada
      const { error } = updateFeedValidation.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Llamar al caso de uso
      const result = await UpdateFeedUseCase.execute({ id: req.params.id, data: req.body });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: 'Error updating feed' });
    }
  },

  // Eliminar una noticia
  async destroy(req: Request, res: Response) {
    try {
      const feed = await FeedModel.findByIdAndDelete(req.params.id);
      if (!feed) return res.status(404).json({ message: "Feed no encontrado" });
      res.json({ message: "Feed eliminado correctamente" });
    } catch (error) {
      res.status(400).json({ message: "Error eliminando feed" });
    }
  },
};
