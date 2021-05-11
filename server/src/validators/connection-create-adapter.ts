import { Request } from "express";
import * as yup from "yup";

import { ApiError } from "../errors";

export class ConnectionCreateAdapter {
  async isValidRequest(request: Request) {
    const schema = yup.object({
      user_id: yup
        .number()
        .integer()
        .positive()
        .strict(true)
        .typeError("Value isn't number")
        .required("Required user ID!"),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      console.error(error);
      throw new ApiError("Some data are invalid!", 400);
    }
  }
}
