import { Request, Response } from 'express';

interface SuccessResponseOptions {
  message?: string;
  metadata?: Record<string, unknown>;
}

export class SuccessResponse {
  // Standard OK (200)
  static ok(req: Request, res: Response, data: any, options: SuccessResponseOptions = {}) {
    this.send(req, res, 200, data, options);
  }

  // Created (201)
  static created(req: Request, res: Response, data: any, options: SuccessResponseOptions = {}) {
    this.send(req, res, 201, data, options);
  }

  // No Content (204)
  static noContent(res: Response) {
    res.status(204).send();
  }

  // Paginated Response
  static paginated(req: Request, res: Response, data: any[], pagination: any) {
    res.status(200).json({
      success: true,
      data,
      pagination,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: req.requestId,
        path: req.originalUrl,
        method: req.method
      }
    });
  }

  private static send(
    req: Request,
    res: Response,
    statusCode: number,
    data: any,
    { message, metadata }: SuccessResponseOptions
  ) {
    res.status(statusCode).json({
      success: true,
      message,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: req.requestId,
        path: req.originalUrl,
        method: req.method,
        ...metadata
      }
    });
  }
}
