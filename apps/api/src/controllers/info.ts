import { Controller, Get } from "@decorators/express";
import { ClassResponseInterceptor } from "../interceptors";

const formatResponse = (response: any) => {
  return { ...response, date: new Date().toISOString() };
};

@ClassResponseInterceptor((res) => formatResponse(res))
@Controller("/info")
export class InfoController {
  @Get("/")
  get() {
    return {
      version: "0.1",
    };
  }

  @Get("/abc")
  get2() {
    return {
      version: "0.2",
    };
  }
}
