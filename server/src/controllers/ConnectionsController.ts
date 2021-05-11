import { Request, Response } from "express";

import { db } from "../database/connection";

import { ApiError } from "../errors";

import { ConnectionCreateAdapter } from "../validators";

export class ConnectionsController {
  async index(request: Request, response: Response) {
    const totalConnections = await db("connection").count("* as total");

    const { total } = totalConnections[0];

    return response.status(200).json({ total });
  }

  async create(request: Request, response: Response) {
    const connectionCreateAdapter = new ConnectionCreateAdapter();

    await connectionCreateAdapter.isValidRequest(request);

    const { user_id } = request.body;

    const userNotExists = await db
      .select("id")
      .from("users")
      .where("id", user_id);

    if (userNotExists.length === 0)
      throw new ApiError("This user isn't exists", 400);

    await db("connection").insert({
      user_id,
    });

    return response.status(201).send();
  }
}
