import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UsePipes } from '@nestjs/common'

import UserEntity from '@/user/entity/user.entity'
import { UserService } from './user.service'
import { IsUserAlreadyExist } from '@/user/pipe/is-user-exist'
import { RegisterUserDTO } from '@/user/dto/register.dto'
import { UpdateUserDTO } from '@/user/dto/update.dto'
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

  @Patch(':id([0-9]+)')
  public updateUser(@Param('id') id: number, @Body() data: UpdateUserDTO): Promise<UserEntity> {
    return this.userService.update(id, data)
  }

  @Delete(':id([0-9]+)')
  @HttpCode(204)
  public destroyUser(@Param('id') id: number): Promise<void> {
    return this.userService.destroy(id)
  }
}
