import { createParamDecorator } from '@nestjs/common'
import { UserEntity } from '@/user/entity/user.entity'
import { Request } from 'express'

/**
 * A decorator to get the user from the request object.
 * Example:
 * ```js
 * async getUser(@UserBody() user: UserEntity): Promise<void> {}
 * ```
 */
export const UserBody = createParamDecorator((data: any, req: Request): UserEntity => {
  return req.user
})

