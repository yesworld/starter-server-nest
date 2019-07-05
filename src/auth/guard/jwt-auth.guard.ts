import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public canActivate(context: ExecutionContext): any {
    /*
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization

    if (!token) {
      return false
    }

    request.user = await this.validateToken(token)
    return true
    */
    return super.canActivate(context)
  }

  public handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    return user
  }
}
