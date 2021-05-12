import { Request, Response } from "express";

import { db } from "../database/connection";
import { ClassesRepository } from "../repositories/ClassesRepository";

import { ApiError } from "../errors";

import { ClassesCreateAdapter } from "../validators";

import { ScheduleItem } from "../@types";

import { convertHourToMinutes } from "../utils/convertHourToMinutes";

export class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time)
      throw new ApiError("Missing filters to search classes", 400);

    const timeInMinutes = convertHourToMinutes(time);

    const classesRepository = new ClassesRepository();

    const classes = await classesRepository.searchClasses(
      Number(week_day),
      timeInMinutes,
      subject
    );

    return response.status(200).json(classes);
  }

  async create(request: Request, response: Response) {
    const classesCreateAdapter = new ClassesCreateAdapter();

    await classesCreateAdapter.isValidRequest(request);

    const { name, avatar, whatsapp, bio, subject, cost, schedule } =
      request.body;

    const trx = await db.transaction();

    try {
      const insertedUsersIds = await trx("users").insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = insertedUsersIds[0];

      await trx("classes").insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedUsersIds[0];

      const classSchedule = schedule.map(
        ({ from, to, week_day }: ScheduleItem) => {
          return {
            class_id,
            week_day: week_day,
            from: convertHourToMinutes(from),
            to: convertHourToMinutes(to),
          };
        }
      );

      await trx("class_schedule").insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch (err) {
      await trx.rollback();

      throw new ApiError("Unexpected error while creating new class", 500);
    }
  }
}
