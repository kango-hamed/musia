import { Request, Response } from 'express';
import { SuccessResponse } from '../../utils/success-response';
import { AuthService } from './auth.service';
import {
  forgotPasswordSchema,
  loginSchema,
  refreshTokenSchema,
  registerSchema,
  resetPasswordSchema
} from './dto/auth.dto';

const authService = new AuthService();

export class AuthController {
  register = async (req: Request, res: Response) => {
    const validatedData = registerSchema.parse(req.body);
    const result = await authService.register(validatedData);
    SuccessResponse.created(req, res, result);
  };

  login = async (req: Request, res: Response) => {
    const validatedData = loginSchema.parse(req.body);
    const result = await authService.login(validatedData);
    SuccessResponse.ok(req, res, result);
  };

  refreshToken = async (req: Request, res: Response) => {
    const validatedData = refreshTokenSchema.parse(req.body);
    const result = await authService.refreshToken(validatedData);
    SuccessResponse.ok(req, res, result);
  };

  logout = async (req: Request, res: Response) => {
    const result = await authService.logout();
    SuccessResponse.ok(req, res, result);
  };

  forgotPassword = async (req: Request, res: Response) => {
    const validatedData = forgotPasswordSchema.parse(req.body);
    const result = await authService.forgotPassword(validatedData);
    SuccessResponse.ok(req, res, result);
  };

  resetPassword = async (req: Request, res: Response) => {
    const validatedData = resetPasswordSchema.parse(req.body);
    const result = await authService.resetPassword(validatedData);
    SuccessResponse.ok(req, res, result);
  };
}
