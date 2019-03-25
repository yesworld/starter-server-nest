import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common'
import { UserService } from './user.service'

import User from '@/user/entity/user.entity'
import { RegisterUserDTO } from '@/user/dto/register.dto'
import { IsUserAlreadyExist } from '@/user/pipe/is-user-exist'

@Controller('/users')
export class UserController {

  constructor(private userService: UserService) {}

  @Get()
  public getUsers(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Post()
  @UsePipes(IsUserAlreadyExist)
  public createUser(@Body() userData: RegisterUserDTO): Promise<User> {
    return this.userService.create(userData)
  }

  @Get(':id([0-9]+)')
  public getUser(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id)
  }

  @Put(':id([0-9]+)')
  public updateUser(@Param('id') id: number, @Body() data: Partial<User>): Promise<Partial<User>> {
    return this.userService.update(id, data)
  }

  @Delete(':id([0-9]+)')
  public destroyUser(@Param('id') id: number): Promise<void> {
    return this.userService.destroy(id)
  }

}
