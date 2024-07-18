import { UserNotFound } from './user-not-found';

describe('UserNotFound', () => {
  it('should be defined', () => {
    expect(new UserNotFound('1')).toBeDefined();
  });
});
