export class UserNotFound extends Error {
  constructor(userId: number) {
    super(`User with id ${userId} not found`);
  }
}
