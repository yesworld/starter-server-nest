import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import User from '@/entity/user'
import { UserController } from '@/controller/user/user.controller'
import { UserService } from '@/service/user/user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
