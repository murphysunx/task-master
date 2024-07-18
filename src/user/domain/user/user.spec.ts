import { User } from './user';

describe('User', () => {
  const user = new User('1', 'murphy', '2022-10-11', '2022-11-13');

  it('should be defined', () => {
    expect(user).toBeDefined();
  });

  it('should return the name', () => {
    expect(user.getName()).toBe('murphy');
  });

  it('should set the name', () => {
    user.setName('new name');
    expect(user.getName()).toBe('new name');
  });

  it('should return the email', () => {
    user.setEmail('test@google.com');
    expect(user.getEmail()).toBe('test@google.com');
  });

  it('should return the password', () => {
    user.setPassword('password');
    expect(user.getPassword()).toBe('password');
  });

  it('should return the created at date', () => {
    expect(user.getCreatedAt()).toBe('2022-10-11');
  });

  it('should return the updated at date', () => {
    expect(user.getUpdatedAt()).toBe('2022-11-13');
  });
});
