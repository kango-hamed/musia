import { Request, Response } from 'express';
import { SuccessResponse } from '../../utils/success-response';
import { createTrajectorySchema, updateTrajectorySchema } from './dto/trajectory.dto';
import { TrajectoryService } from './trajectory.service';

const trajectoryService = new TrajectoryService();

export class TrajectoryController {
  create = async (req: Request, res: Response) => {
    const validatedData = createTrajectorySchema.parse(req.body);
    const result = await trajectoryService.create(validatedData);
    SuccessResponse.created(req, res, result);
  };

  findAll = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const activeOnly = req.query.active === 'true';

    const { data, pagination } = await trajectoryService.findAll(page, limit, activeOnly);
    SuccessResponse.paginated(req, res, data, pagination);
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await trajectoryService.findOne(id);
    SuccessResponse.ok(req, res, result);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const validatedData = updateTrajectorySchema.parse(req.body);
    const result = await trajectoryService.update(id, validatedData);
    SuccessResponse.ok(req, res, result);
  };

  remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await trajectoryService.remove(id);
    SuccessResponse.ok(req, res, result);
  };
}
