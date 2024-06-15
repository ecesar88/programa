import { Controller, Get } from "@decorators/express";
import { ResponseInterceptor } from "../interceptors";
import { ApplyOnAllRoutes } from "../interceptors/ApplyOnAllRoutes";

const formatResponse = (response: any) => {
  return { ...response, date: new Date().toISOString() };
};

@ApplyOnAllRoutes()
@Controller("/info")
export class InfoController {
  @ResponseInterceptor((res) => formatResponse(res))
  @Get("/")
  get() {
    return {
      version: "0.1",
    };
  }

  get2() {
    console.log("a");
    return "b";
  }
}
