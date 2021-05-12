import { db } from "../database/connection";

export class ClassesRepository {
  async searchClasses(
    week_day: number,
    timeInMinutes: number,
    subject: string
  ) {
    return await db("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("`class_schedule` . `class_id` = `classes` . `id`")
          .whereRaw("`class_schedule` . `week_day` = ??", [Number(week_day)])
          .whereRaw("`class_schedule` . `from` <= ??", [timeInMinutes])
          .whereRaw("`class_schedule` . `to` > ??", [timeInMinutes]);
      })
      .where("classes.subject", "=", subject)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);
  }
}
