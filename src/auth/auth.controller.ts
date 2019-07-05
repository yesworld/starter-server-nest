import { Controller, Body, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { LoginUserDTO } from '@/user/dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  public async getToken(@Body() credentials: LoginUserDTO): Promise<{ token: string }> {
    const token = await this.authService.createToken(credentials)
    return { token }
  }
}
