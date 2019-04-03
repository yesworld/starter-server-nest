import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { Connection } from 'typeorm'

import { AuthModule } from '@/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
