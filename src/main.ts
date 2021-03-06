import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

// SECURITY PLUGINS
// @ts-ignore
import * as rateLimit from 'express-rate-limit'
// @ts-ignore
import * as helmet from 'helmet'

import { AppModule } from '@/app.module'
import { PORT } from '@/config'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.setGlobalPrefix('api')
  app.use(helmet())
  app.use(
    // @ts-ignore
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  )

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  await app.listen(PORT)

  Logger.log(`Server running on http://localhost:${PORT}/`, 'Info')
}
bootstrap()
