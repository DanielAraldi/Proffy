import { Request, Response } from "express";

import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

import { ApiError } from "../errors";

import { ConnectionCreateAdapter } from "../validators";

export class ConnectionsController {
  async index(request: Request, response: Response) {
    const connectionsRepository = new ConnectionsRepository();

    const totalConnections = await connectionsRepository.count();

    const { total } = totalConnections[0];

    return response.status(200).json({ total });
  }

  async create(request: Request, response: Response) {
    const connectionCreateAdapter = new ConnectionCreateAdapter();

    await connectionCreateAdapter.isValidRequest(request);

    const { user_id } = request.body;

    const connectionsRepository = new ConnectionsRepository();

    const userNotExists = await connectionsRepository.findOne(user_id);

    if (userNotExists.length === 0)
      throw new ApiError("This user isn't exists", 400);

    await connectionsRepository.insert(user_id);

    return response.status(201).send();
  }
}
