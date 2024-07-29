import { InMemoryUserRepository } from "../../__mocks__/InMemoryUserRepository";
import { UserDelete } from "../../../../../src/lib/User/application/UserDelete/UserDelete";
import { UserStub } from "../../domain/UserStub";

describe("UserCreate should", () => {
  test("Delete a User", async () => {
    const user = UserStub.create();
    const repository = new InMemoryUserRepository([user]);
    const deleteUserCase = new UserDelete(repository);

    const userBefore = await repository.getAll();
    expect(userBefore).toHaveLength(1);
    await deleteUserCase.run(user.id.value);
    const userAfter = await repository.getAll();
    expect(userAfter).toHaveLength(0);
  });
});
