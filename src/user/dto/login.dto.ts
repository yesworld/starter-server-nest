import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator'

/**
 * The DTO for login in a user.
 */
export class LoginUserDTO {
  @IsNotEmpty({ message: 'Please enter a Login.' })
  @Matches(/^[a-z0-9\-_]{0,}$/i, {
    message: 'incorrect Login',
  })
  @MinLength(5)
  @MaxLength(20)
  public readonly login!: string

  @IsNotEmpty({ message: 'Please enter a Password.' })
  @Matches(/^[a-z0-9\-_!@#$%]{0,}$/i, {
    message: 'incorrect Password',
  })
  @MinLength(5)
  @MaxLength(20)
  public readonly password!: string
}
