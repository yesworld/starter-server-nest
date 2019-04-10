import { Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'

import { AuthService } from '@/auth/auth.service'
import { JWT_SECRET } from '@/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
      private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    })
  }

  public async validate(payload: any): Promise<any> {
    return await this.authService.validateUser(payload)
  }
}
