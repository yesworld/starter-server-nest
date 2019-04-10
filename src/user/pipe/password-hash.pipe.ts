import { ArgumentMetadata, PipeTransform, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class PasswordHash implements PipeTransform {

  /**
   * Hashes the password.
   * @async
   * @param value The value to hash. Either an object or string.
   * @param metadata Pipe metadata provided by Nest.
   * @returns The object with the hashed password.
   */
  public async transform(value: any, metadata?: ArgumentMetadata) {
    if (value === null) { return value }

    if (typeof value === 'string') {
      value = { password: value }
    }

    if (typeof value === 'object' && value.password) {
      const salt = await bcrypt.genSalt(12)
      const hash = await bcrypt.hash(value.password, salt)
      return Object.assign(value, { password: hash })
    }

    return value
  }
}
