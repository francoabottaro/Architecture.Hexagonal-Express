import { UserNotFoundError } from "../../domain/UserNotFoundError";
import { User } from "../../domain/User";
import { UserCreatedAt } from "../../domain/UserCreatedAt";
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserRepository } from "../../domain/UserRepository";

export class UserEdit {
  constructor(private repository: UserRepository) {}
  async run(
    id: string,
    name: string,
    email: string,
    CreatedAt: Date
  ): Promise<void> {
    const user = new User(
      new UserId(id),
      new UserName(name),
      new UserEmail(email),
      new UserCreatedAt(CreatedAt)
    );
    const userExist = await this.repository.getOneById(user.id);
    if (!userExist) throw new UserNotFoundError("User not found");
    return await this.repository.create(user);
  }
}
