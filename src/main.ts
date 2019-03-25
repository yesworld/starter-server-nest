import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'

// SECURITY PLUGINS
import * as helmet from 'helmet'
import * as rateLimit from 'express-rate-limit'

import { AppModule } from '@/app.module'
import { PORT } from '@/config'
import { ValidationUserPipe } from '@/user/pipe/validation.pipe'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.setGlobalPrefix('api')
  app.use(helmet())
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }))

  // app.enableCors()

  app.useGlobalPipes(new ValidationUserPipe())
  await app.listen(PORT)

  Logger.log(`Server running on http://localhost:${PORT}/`, 'Info') // tslint:disable-line
}
bootstrap()
