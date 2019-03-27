import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common'

import UserEntity from '@/user/entity/user.entity'
import { UserService } from './user.service'
import { RegisterUserDTO } from '@/user/dto/register.dto'
import { IsUserAlreadyExist } from '@/user/pipe/is-user-exist'
// import { User } from '@/user/user.decorator'

@Controller('/users')
export class UserController {

  constructor(
      private readonly userService: UserService,
  ) {}

  @Get()
  public getUsers(): Promise<UserEntity[]> {
    return this.userService.findAll()
  }

  @Post()
  @UsePipes(IsUserAlreadyExist)
  public createUser(@Body() userData: RegisterUserDTO): Promise<UserEntity> {
    return this.userService.create(userData)
  }

  @Get(':id([0-9]+)')
  public getUser(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(id)
  }

  @Put(':id([0-9]+)')
  @UsePipes(IsUserAlreadyExist)
  public updateUser(@Param('id') id: number, @Body() data: Partial<UserEntity>): Promise<Partial<UserEntity>> {
    return this.userService.update(id, data)
  }

  @Delete(':id([0-9]+)')
  public destroyUser(@Param('id') id: number): Promise<void> {
    return this.userService.destroy(id)
  }

}
