import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator'

/**
 * The DTO for update a user.
 */
export class UpdateUserDTO {
  @IsNotEmpty()
  @Matches(/^[a-z0-9\-_]{5,20}$/i, {
    message: 'incorrect Login',
  })
  @IsOptional()
  public readonly login!: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly firstName!: string

  @IsOptional()
  public readonly lastName!: string

  @IsNotEmpty({
    message: 'Password must not be empty',
  })
  @Matches(/^[a-z0-9\-_!@#$%]{5,20}$/i, {
    message: 'incorrect Password',
  })
  @IsOptional()
  public readonly password!: string
}
