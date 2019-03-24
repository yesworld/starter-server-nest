import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import User from '@/entity/user.entity'

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
  ) {}

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  public async create(newUser: User): Promise<User> {
    const user: User = await this.userRepository.save(newUser)
    delete user.password

    return user
  }

  public async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id)
  }

  public async update(id: number, data: Partial<User>): Promise<User> {
    await this.userRepository.update(id, data)
    return await this.findOne(id)
  }

  public async destroy(id: number): Promise<void> {
    await this.userRepository.delete(id)
    Logger.log(`${id} User has been saved`, 'info')
  }
}
