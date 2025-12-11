import { Request, Response } from 'express';
import { ArtworkService } from './artwork.service';
import { createArtworkSchema, updateArtworkSchema } from './dto/artwork.dto';

const artworkService = new ArtworkService();

export class ArtworkController {
  create = async (req: Request, res: Response) => {
    const validatedData = createArtworkSchema.parse(req.body);
    const result = await artworkService.create(validatedData);
    res.status(201).json({
      success: true,
      data: result
    });
  };

  findAll = async (_req: Request, res: Response) => {
    const result = await artworkService.findAll();
    res.json({
      success: true,
      data: result
    });
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await artworkService.findOne(id);
    res.json({
      success: true,
      data: result
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const validatedData = updateArtworkSchema.parse(req.body);
    const result = await artworkService.update(id, validatedData);
    res.json({
      success: true,
      data: result
    });
  };

  remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await artworkService.remove(id);
    res.json({
      success: true,
      data: result
    });
  };
}
