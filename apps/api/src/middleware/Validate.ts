import { attachMiddleware } from "@decorators/express";
import { NextFunction, Request, Response } from "express";
import { ZodRawShape, z } from "zod";
import { fromError } from "zod-validation-error";

export function ValidateWith<T extends ZodRawShape>(
  zodSchema: z.ZodObject<T>
) {
  return function (
    target: any,
    propertyKey: string,
    _descriptor: PropertyDescriptor
  ) {
    return attachMiddleware(
      target,
      propertyKey,
      function (_req: Request, res: Response, next: NextFunction) {
        const originalJson = res.json;

        res.json = function (body) {
          try {
            zodSchema.parse(body);

            originalJson.call(this, body);
            return body;
          } catch (error) {
            const formattedError = fromError(error);

            const newBody = {
              message: "Validation Error",
              errors: formattedError,
            };

            originalJson.call(this, newBody);
          }
        };

        next();
      }
    );
  };
}
