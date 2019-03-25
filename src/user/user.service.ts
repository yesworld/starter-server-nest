import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import UserEntity from '@/user/entity/user.entity'
import { RegisterUserDTO } from '@/user/dto/register.dto'

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(UserEntity)
      private readonly _userRepository: Repository<UserEntity>,
  ) {}

  public async findAll(): Promise<UserEntity[]> {
    return await this._userRepository.find()
  }

  public async create(dataUser: RegisterUserDTO): Promise<UserEntity> {
    const user: UserEntity = await this._userRepository.save(dataUser)
    delete user.password

    return user
  }

  public async findOne(id: number): Promise<UserEntity> {
    return await this._userRepository.findOne(id)
  }

  public async update(id: number, data: Partial<UserEntity>): Promise<UserEntity> {
    await this._userRepository.update(id, data)
    return await this.findOne(id)
  }

  public async destroy(id: number): Promise<void> {
    await this._userRepository.delete(id)
    Logger.log(`${id} User has been saved`, 'info')
  }
}
