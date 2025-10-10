/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// Intercepts the response from a metho annotated with @Get, @Post, @Delete, @Put or @Patch
import { attachMiddleware } from "@decorators/express";
import { NextFunction, Request, Response } from "express";

export function ResponseInterceptor<T = {}>(interceptor: (body: T) => any) {
	return function (target: any, propertyKey: string, _descriptor: PropertyDescriptor) {
		return attachMiddleware(
			target,
			propertyKey,
			function (_req: Request, res: Response, next: NextFunction) {
				const originalJson = res.json;

				res.json = function (body) {
					const newBody = interceptor(body);

					originalJson.call(this, newBody);
					return newBody;
				};

				next();
			},
		);
	};
}
