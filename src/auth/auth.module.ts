import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'

import { JWT_SECRET, EXPIRES_IN } from '@/config'
import { UserModule } from '@/user/user.module'

import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'
import { AuthService } from './auth.service'

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: EXPIRES_IN,
      },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
