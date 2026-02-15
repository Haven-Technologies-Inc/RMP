import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WebRTCService } from './webrtc.service';

@ApiTags('WebRTC')
@Controller('webrtc')
export class WebRTCController {
  constructor(private readonly webrtcService: WebRTCService) {}

  @Get('turn-credentials')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get TURN server credentials for WebRTC calls' })
  async getTurnCredentials() {
    return this.webrtcService.getTurnCredentials();
  }
}
