import { Request, Response } from "express";
import { createFeedValidation, updateFeedValidation } from '../../utils/validation/feed.validation';
import { ReadFeedsUseCase } from '../../application/usecases/ReadFeedsUseCase';
import { CreateFeedUseCase } from '../../application/usecases/CreateFeedUseCase';
import { UpdateFeedUseCase } from '../../application/usecases/UpdateFeedUseCase';
import { DeleteFeedUseCase } from '../../application/usecases/DeleteFeedUseCase';
import { GetFeedByIdUseCase } from '../../application/usecases/GetFeedByIdUseCase';
import { GetAllFeedsUseCase } from '../../application/usecases/GetAllFeedsUseCase';

export const FeedController = {
  // Obtener todas las noticias
  async index(req: Request, res: Response) {
    try {
      const feeds = await GetAllFeedsUseCase.execute();
      res.json(feeds);
    } catch (error) {
      res.status(500).json({ message: "Error obteniendo feeds" });
    }
  },

  // Obtener una noticia por ID
  async show(req: Request, res: Response) {
    try {
      const feed = await GetFeedByIdUseCase.execute(req.params.id);
      if (!feed) return res.status(404).json({ message: "Feed no encontrado" });
      res.json(feed);
    } catch (error) {
      res.status(400).json({ message: "Error obteniendo feed" });
    }
  },

  // Crear una noticia
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
      const result = await UpdateFeedUseCase.execute(req.params.id, req.body);
      if (!result) return res.status(404).json({ message: "Feed no encontrado" });
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: "Error actualizando feed" });
    }
  },

  // Eliminar una noticia
  async destroy(req: Request, res: Response) {
    try {
      // Llamar al caso de uso
      await DeleteFeedUseCase.execute(req.params.id);
      res.json({ message: "Feed eliminado correctamente" });
    } catch (error) {
      res.status(400).json({ message: "Error eliminando feed" });
    }
  },

  // Leer feeds de portada (web scraping)
  async readFeeds(req: Request, res: Response) {
    try {
      await ReadFeedsUseCase.execute();
      return res.status(200).json({ message: 'Feeds updated successfully' });
    } catch (err) {
      return res.status(500).json({ error: 'Error updating feeds' });
    }
  }
};