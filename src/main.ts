import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { AppModule } from '@/app.module'
import { PORT } from '@/config'


async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  await app.listen(PORT)

  Logger.log(`Server running on http://localhost:${PORT}/`, 'Info') // tslint:disable-line
}
bootstrap()
