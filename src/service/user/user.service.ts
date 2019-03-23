import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import User from '@/entity/user'

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async create(newUser: User): Promise<User> {
    const user: User = await this.userRepository.save(newUser)
    delete user.password

    return user
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id)
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    await this.userRepository.update(id, data)
    return await this.findOne(id)
  }

  async destroy(id: number): Promise<void> {
    await this.userRepository.delete(id)
    Logger.log(`${id} User has been saved`, 'info')
  }
}
