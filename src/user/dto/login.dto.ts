import { IsNotEmpty, Matches } from 'class-validator'

/**
 * The DTO for login in a user.
 */
export class LoginUserDTO {

  @IsNotEmpty()
  @Matches(/^[a-z0-9\-_]{5,20}$/i, {
    message: 'incorrect Login',
  })
  public readonly login: string

  @IsNotEmpty({
    message: 'Password must not be empty',
  })
  @Matches(/^[a-z0-9\-_!@#$%]{5,20}$/i, {
    message: 'incorrect Password',
  })
  public readonly password: string
}
