import { Request, Response } from "express";

import db from "../database/connection";

export class ConnectionsController {
  async index(request: Request, response: Response) {
    const totalConnections = await db("connection").count("* as total");

    const { total } = totalConnections[0];

    return response.status(200).json({ total });
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.body;

    await db("connection").insert({
      user_id,
    });

    return response.status(201).send();
  }
}
