import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UserService } from '@/service/user/user.service'
import User from '@/entity/user'

@Controller('/users')
export class UserController {

  constructor(private userService: UserService) {}

  @Get()
  public getUsers(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Post()
  public createUser(@Body() data: User): Promise<User> {
    return this.userService.create(data)
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
