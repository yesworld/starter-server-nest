import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { RegisterUserDTO } from '@/user/dto/register.dto'
import { UserEntity } from '@/user/entity/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  public async create(dataUser: RegisterUserDTO): Promise<UserEntity> {
    const user = await this.userRepository.create(dataUser)

    const savedUser: UserEntity = await this.userRepository.save(user)
    delete savedUser.password

    return savedUser
  }

  public async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id)

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }

  public async update(id: number, data: Partial<UserEntity>): Promise<UserEntity> {
    await this.userRepository.update(id, data)
    return await this.findOne(id)
  }

  public async destroy(id: number): Promise<void> {
    const user = await this.findOne(id)
    await this.userRepository.delete(id)

    Logger.log(`User {${user.email}} has been deleted`, 'info')
  }

  /**
   * Finds the user by the credentials
   * @param login
   */
  public async findByLogin(login: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        login,
      },
    })

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }
}
