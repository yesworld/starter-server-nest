import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  PipeTransform,
  Type,
} from '@nestjs/common'
import { validate, ValidationError } from 'class-validator'
import { plainToClass } from 'class-transformer'

/**
 * Validation pipe which uses class-validator to verify request body models.
 * Similar to the default NestJS validation pipe but parses errors into nicer format.
 * @export
 * @class ValidationUserPipe
 * @implements {PipeTransform<any>}
 */
@Injectable()
export class ValidationUserPipe implements PipeTransform<any> {

  public async transform(value: any, { metatype }: ArgumentMetadata) {

    if (!metatype || !this.toValidate(metatype)) {
      return value
    }

    const object = await plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      const error = this.extractPrettyErrors(errors)

      throw new NotAcceptableException({
        message: 'Validation failed.',
        errors: error,
        code: HttpStatus.BAD_REQUEST,
      })
    }
    return object
  }

  private toValidate(metatype: Type<any>): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.find((type) => metatype === type)
  }

  private extractPrettyErrors(errors: ValidationError[]) {
    const allErrors = errors.map((x) =>
        Object
            .keys(x.constraints)
            .map((y) => ({
                  filed: x.property,
                  text: x.constraints[y],
                })
            ),
    )

    return allErrors.reduce((prev, cur) => prev.concat(cur))
  }
}
