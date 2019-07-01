import {
  ArgumentMetadata,
  PipeTransform,
  Injectable,
  ConflictException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { RegisterUserDTO } from '@/user/dto/register.dto'
import { UserEntity } from '@/user/entity/user.entity'

/**
 * Pipe to validate if a login or/and email are taken.
 * @property userRepository - The repository for interacting with the users table.
 * Example:
 * ```js
 * async register(@Body(IsUserAlreadyExist) userData: RegisterUserDTO) {}
 * ```
 */
@Injectable()
export class IsUserAlreadyExist implements PipeTransform {

  /**
   * Method to inject the UserRepository for use in the transform method.
   * @constructor
   * @param userRepository An instance of the UserRepository, injected by Nest.
   */
  constructor(
      @InjectRepository(UserEntity)
      private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Checks that email and login in RegisterUserDTO are available.
   * @async
   * @throws Throws conflict exception to return correct response if the username or email are taken.
   * @param userData The data to validate. Should be an instance of RegisterUserDTO.
   * @param metadata Nest's Argument Metadata.
   * @returns The original data, if validation has passed.
   */
  public async transform(userData: RegisterUserDTO, metadata?: ArgumentMetadata): Promise<RegisterUserDTO> {

    const { email, login }: { email: string; login: string } = userData

    const userByLogin = await this.userRepository.findOne({ login })
    if (userByLogin) {
      throw new ConflictException('This login is already taken.')
    }

    const userByEmail = await this.userRepository.findOne({ email })
    if (userByEmail) {
      throw new ConflictException('This email is already in use.')
    }

    return userData
  }
}
