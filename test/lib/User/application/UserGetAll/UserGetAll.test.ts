import { UserGetAll } from "../../../../../src/lib/User/application/UserGetAll/UserGetAll";
import { InMemoryUserRepository } from "../../__mocks__/InMemoryUserRepository";

describe("UserGetAll should", () => {
  test("return all user", async () => {
    const repository = new InMemoryUserRepository();
    const useCase = new UserGetAll(repository);
    const users = await useCase.run();

    expect(users).toHaveLength(0);
  });
});
