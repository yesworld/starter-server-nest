import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { LoginUserDTO } from '@/user/dto/login.dto'
import { UserService } from '@/user/user.service'

/**
 * A service to handle authenticating users.
 */
@Injectable()
export class AuthService {

  constructor(
      private readonly userService: UserService,
      private readonly jwtService: JwtService,
  ) {}

  public async createToken(userData: LoginUserDTO): Promise<string> {
    const user = await this.userService.findByLogin(userData.login)
    const isValidPass = await bcrypt.compare(userData.password, user.password)

    if (!isValidPass) {
      throw new NotFoundException()
    }

    return await this.jwtService.sign({id: user.id})
  }

  /**
   * Finds a user by the token they supply.
   */
  public async validateUser(payload: {id: number}): Promise<any> {
    return await this.userService.findOne(payload.id)
  }
}
