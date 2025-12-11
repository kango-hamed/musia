import { Request, Response } from 'express';
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
    res.status(201).json({
      success: true,
      data: result
    });
  };

  login = async (req: Request, res: Response) => {
    const validatedData = loginSchema.parse(req.body);
    const result = await authService.login(validatedData);
    res.json({
      success: true,
      data: result
    });
  };

  refreshToken = async (req: Request, res: Response) => {
    const validatedData = refreshTokenSchema.parse(req.body);
    const result = await authService.refreshToken(validatedData);
    res.json({
      success: true,
      data: result // Always return true for security
    });
  };

  logout = async (_req: Request, res: Response) => {
    const result = await authService.logout();
    res.json({
      success: true,
      data: result
    });
  };

  forgotPassword = async (req: Request, res: Response) => {
    const validatedData = forgotPasswordSchema.parse(req.body);
    const result = await authService.forgotPassword(validatedData);
    res.json({
      success: true,
      data: result
    });
  };

  resetPassword = async (req: Request, res: Response) => {
    const validatedData = resetPasswordSchema.parse(req.body);
    const result = await authService.resetPassword(validatedData);
    res.json({
      success: true,
      data: result
    });
  };
}
