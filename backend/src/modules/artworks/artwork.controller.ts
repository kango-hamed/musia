import { Request, Response } from 'express';
import { SuccessResponse } from '../../utils/success-response';
import { createNarrativeSchema } from '../narrative-content/dto/narrative.dto';
import { NarrativeService } from '../narrative-content/narrative.service';
import { ArtworkService } from './artwork.service';
import { createArtworkSchema, updateArtworkSchema } from './dto/artwork.dto';

const artworkService = new ArtworkService();
const narrativeService = new NarrativeService();

export class ArtworkController {
  create = async (req: Request, res: Response) => {
    const validatedData = createArtworkSchema.parse(req.body);
    const result = await artworkService.create(validatedData);
    SuccessResponse.created(req, res, result);
  };

  findAll = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const { data, pagination } = await artworkService.findAll(page, limit);
    SuccessResponse.paginated(req, res, data, pagination);
  };

  getNarratives = async (req: Request, res: Response) => {
    const { id } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const { data, pagination } = await narrativeService.findAll(id, page, limit);
    SuccessResponse.paginated(req, res, data, pagination);
  };

  createNarrative = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = { ...req.body, artworkId: id };
    const validatedData = createNarrativeSchema.parse(body);
    const result = await narrativeService.create(validatedData);
    SuccessResponse.created(req, res, result);
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await artworkService.findOne(id);
    SuccessResponse.ok(req, res, result);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const validatedData = updateArtworkSchema.parse(req.body);
    const result = await artworkService.update(id, validatedData);
    SuccessResponse.ok(req, res, result);
  };

  remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await artworkService.remove(id);
    SuccessResponse.ok(req, res, result);
  };

  uploadImage = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!req.file) {
      throw new Error('No file uploaded');
    }
    const result = await artworkService.uploadImage(id, req.file);
    SuccessResponse.ok(req, res, result);
  };
}
