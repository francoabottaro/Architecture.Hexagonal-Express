import { NextFunction, Request, Response } from "express";
import { UserNotFoundError } from "../domain/UserNotFoundError";
import { ServiceContainer } from "../../Share/infrastructure/ServiceContainer";

export class ExpressUserControlle {
  // * Get All User
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await ServiceContainer.user.getAll.run();
      return res.json(users.map((user) => user.mapToPrimitives())).status(200);
    } catch (error) {
      next(error);
    }
  }

  // * Get One User
  async getOneById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await ServiceContainer.user.getOneById.run(req.params.id);
      //* Done: the user was found
      return res.json(user.mapToPrimitives()).status(200);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).send({ message: error.message });
      }

      // ! Error: is distint to notFound
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name, email, createdAt } = req.body as {
        id: string;
        name: string;
        email: string;
        createdAt: string;
      };
      await ServiceContainer.user.create.run(
        id,
        name,
        email,
        new Date(createdAt)
      );
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  }

  // TODO PUT
  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name, email, createdAt } = req.body as {
        id: string;
        name: string;
        email: string;
        createdAt: string;
      };
      await ServiceContainer.user.edit.run(
        id,
        name,
        email,
        new Date(createdAt)
      );
      return res.status(204).send();
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).send({ message: error.message });
      }
      next(error);
    }
  }

  //! DELETE
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await ServiceContainer.user.delete.run(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
