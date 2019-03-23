import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { UserService } from './service/user/user.service';
import { UserController } from './controller/user/user.controller';
import { UserModule } from './module/user/user.module';
import User from '@/entity/user'

@Module({
  imports: [TypeOrmModule.forRoot(), User, UserModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
