import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import User from '@/user/entity/user.entity'
import { UserService } from '@/user/user.service'
import { UserController } from '@/user/user.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
