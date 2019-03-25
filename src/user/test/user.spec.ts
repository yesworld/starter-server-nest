import { UserDto } from '../user'

describe('User', () => {
  it('should be defined', () => {
    expect(new UserDto()).toBeDefined()
  })
})
