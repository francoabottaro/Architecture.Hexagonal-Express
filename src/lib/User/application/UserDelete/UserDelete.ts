import { UserNotFoundError } from "../../domain/UserNotFoundError";
import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";

export class UserDelete {
  constructor(private repository: UserRepository) {}
  async run(id: string): Promise<void> {
    if (!id) throw new UserNotFoundError("User not found");
    await this.repository.delete(new UserId(id));
  }
}
