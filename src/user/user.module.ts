import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IsUserAlreadyExist } from './pipe/is-user-exist.pipe'

import { UserEntity } from '@/user/entity/user.entity'
import { UserService } from '@/user/user.service'
import { UserController } from '@/user/user.controller'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, IsUserAlreadyExist],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
