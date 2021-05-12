import { db } from "../database/connection";

export class ConnectionsRepository {
  async count() {
    return await db("connection").count("* as total");
  }

  async findOne(user_id: number) {
    return await db.select("id").from("users").where("id", user_id);
  }

  async insert(user_id: number) {
    return await db("connection").insert({
      user_id,
    });
  }
}
