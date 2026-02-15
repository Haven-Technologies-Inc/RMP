import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      name: 'VytalWatch AI API',
      version: '1.0.0',
      status: 'running',
      documentation: '/api/v1',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('favicon.ico')
  getFavicon(@Res() res: Response) {
    res.status(204).send();
  }

  @Get('health')
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
