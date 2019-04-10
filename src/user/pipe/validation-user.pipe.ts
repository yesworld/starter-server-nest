import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  PipeTransform,
  Type,
} from '@nestjs/common'
import { validate, ValidationError } from 'class-validator'
import { plainToClass, classToPlain } from 'class-transformer'

/**
 * Validation pipe which uses class-validator to verify request body models.
 * Similar to the default NestJS validation pipe but parses errors into nicer format.
 * @export
 * @class ValidationUserPipe
 * @implements {PipeTransform<any>}
 */
@Injectable()
export class ValidationUserPipe implements PipeTransform<any, any> {

  public async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {

    if (!metatype || !this.toValidate(metatype)) {
      return value
    }

    /**
     * The current version does not support the ClassTransformOption.excludeExtraneousValues property,
     * which is already mentioned in the docs.
     * https://github.com/typestack/class-transformer/issues/236
     */
    const optionTransform = {
      excludeExtraneousValues: true,
    } as any  // tslint:disable-line

    const object = await plainToClass(metatype, value, optionTransform)

    const errors = await validate(object, {
      whitelist: true,
      // forbidUnknownValues: true,
    })

    if (errors.length > 0) {
      const error = this.extractPrettyErrors(errors)

      throw new NotAcceptableException({
        message: 'Validation failed.',
        errors: error,
        code: HttpStatus.BAD_REQUEST,
      })
    }

    return classToPlain(object)
  }

  private toValidate(metatype: Type<any>): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.find((type: any) => metatype === type)
  }

  private extractPrettyErrors(errors: ValidationError[]): object[] {
    const allErrors = errors.map((x: ValidationError) =>
        Object
            .keys(x.constraints)
            .map((y: string) => ({
                  filed: x.property,
                  text: x.constraints[y],
                }),
            ),
    )

    return allErrors
        .reduce((prev: any[], cur: any[]) => prev.concat(cur))
  }
}
