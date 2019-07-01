import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator'

/**
 * The DTO for registering a user.
 */
export class RegisterUserDTO {

  @IsNotEmpty()
  @Matches(/^[a-z0-9\-_]{5,20}$/i, {
    message: 'incorrect Login',
  })
  public readonly login!: string

  @IsEmail()
  @IsNotEmpty()
  public readonly email!: string

  @IsString()
  @IsNotEmpty()
  public readonly firstName!: string

  public readonly lastName!: string

  @IsNotEmpty({
    message: 'Password must not be empty',
  })
  @Matches(/^[a-z0-9\-_!@#$%]{5,20}$/i, {
    message: 'incorrect Password',
  })
  public readonly password!: string

}
