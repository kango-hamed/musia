import { Request, Response } from 'express';
import { createNarrativeSchema, updateNarrativeSchema } from './dto/narrative.dto';
import { NarrativeService } from './narrative.service';
import { SuccessResponse } from '../../utils/success-response';

const narrativeService = new NarrativeService();

export class NarrativeController {
  create = async (req: Request, res: Response) => {
    const validatedData = createNarrativeSchema.parse(req.body);
    const result = await narrativeService.create(validatedData);
    SuccessResponse.created(req, res, result);
  };

  findAll = async (req: Request, res: Response) => {
    const { artworkId } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const { data, pagination } = await narrativeService.findAll(artworkId as string, page, limit);
    SuccessResponse.paginated(req, res, data, pagination);
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await narrativeService.findOne(id);
    SuccessResponse.ok(req, res, result);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const validatedData = updateNarrativeSchema.parse(req.body);
    const result = await narrativeService.update(id, validatedData);
    SuccessResponse.ok(req, res, result);
  };

  remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await narrativeService.remove(id);
    SuccessResponse.ok(req, res, result);
  };

  uploadAudio = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!req.file) {
      throw new Error('No file uploaded');
    }
    const result = await narrativeService.uploadAudio(id, req.file);
    SuccessResponse.ok(req, res, result);
  };
}
