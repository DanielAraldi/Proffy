import { Request } from "express";
import * as yup from "yup";

import { ApiError } from "../errors";

export class ClassesCreateAdapter {
  async isValidRequest(request: Request) {
    const schema = yup.object({
      name: yup
        .string()
        .trim()
        .strict(true)
        .typeError("Value isn't string")
        .required("Required user name!"),
      avatar: yup
        .string()
        .trim()
        .strict(true)
        .typeError("Value isn't string")
        .required("Required user avatar!"),
      whatsapp: yup
        .string()
        .max(19)
        .trim()
        .strict(true)
        .typeError("Value isn't string")
        .required("Required user whatsapp!"),
      bio: yup
        .string()
        .max(1000)
        .trim()
        .strict(true)
        .typeError("Value isn't string"),
      subject: yup
        .string()
        .trim()
        .strict(true)
        .typeError("Value isn't string")
        .required("Required user subject!"),
      cost: yup
        .number()
        .positive()
        .strict(true)
        .typeError("Value isn't number")
        .required("Required user cost!"),
      schedule: yup
        .array()
        .of(
          yup
            .object({
              week_day: yup
                .number()
                .integer()
                .positive()
                .strict(true)
                .typeError("Value isn't number")
                .required("Required the week day!"),
              from: yup
                .string()
                .trim()
                .strict(true)
                .typeError("Value isn't string")
                .required("Required the hour from!"),
              to: yup
                .string()
                .trim()
                .strict(true)
                .typeError("Value isn't string")
                .required("Required the hour to!"),
            })
            .strict(true)
            .typeError("Value isn't object")
            .required("Required user schedule!")
        )
        .strict(true)
        .typeError("Value isn't array object")
        .required("Required user schedule!"),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      console.error(error);
      throw new ApiError("Some data are invalid!", 400);
    }
  }
}
