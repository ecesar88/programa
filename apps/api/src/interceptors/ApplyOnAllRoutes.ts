// import { Injectable } from "@decorators/di";
// import { Middleware } from "@decorators/express";
// import { Type } from "@decorators/express/lib/src/types";
// import { RouterOptions } from "express";

import { InfoController } from "src/controllers/infoController";

// /**
//  * All possible parameter decorator types
//  *
//  * @export
//  * @enum {number}
//  */
// export enum ParameterType {
//   REQUEST,
//   RESPONSE,
//   PARAMS,
//   QUERY,
//   BODY,
//   HEADERS,
//   COOKIES,
//   NEXT
// }

// /**
//  * Cached(meta) parameter configuration
//  *
//  * @export
//  * @interface ParameterConfiguration
//  */
// export interface ParameterConfiguration {
//   index: number;
//   type: ParameterType;
//   name?: string;
//   data?: any;
// }

// /**
//  * Cached(meta) route configuration
//  *
//  * @export
//  * @interface Route
//  */
// export interface Route {
//   method: string;
//   url: string;
//   middleware: Middleware[];
// }

// /**
//  * Method metadata object
//  */
// export interface MethodMeta {
//   routes: Route[];
//   status?: number;
// }

// export interface ExpressMeta {
//   url: string;

//   routerOptions?: RouterOptions;

//   routes: {
//     [instanceMethodName: string]: MethodMeta;
//   };

//   middleware: Middleware[];

//   params: {
//     [key: string]: ParameterConfiguration[];
//   };
// }

// /**
//  * Express decorators controller
//  *
//  * @export
//  * @interface ExpressMeta
//  */
// export interface ExpressClass {
//   __express_meta__?: ExpressMeta;
// }

// /**
//  * Get or initiate metadata on a target
//  *
//  * @param {ExpressClass} target
//  * @returns {ExpressMeta}
//  */
// export function getMeta(target: ExpressClass): ExpressMeta {
//   if (!target.__express_meta__) {
//     target.__express_meta__ = {
//       url: '',
//       middleware: [],
//       routes: {},
//       params: {},
//     };
//   }
//   return target.__express_meta__;
// }

export function ApplyOnAllRoutes() {
  return (target: typeof InfoController) => {
    // console.log('TARGET entries >>>>>>> ', target.prototype);
    console.log("a, ", Object.getOwnPropertyDescriptors(target.prototype));
    // for (const propertyName of Object.keys(target.prototype)) {
    //   console.log()
    // }

    // const meta: ExpressMeta = getMeta(target.prototype as ExpressClass);
    // meta.url = url;
    // meta.middleware = Array.isArray(middlewareOrRouterOptions) ? middlewareOrRouterOptions : middleware;
    // meta.routerOptions = Array.isArray(middlewareOrRouterOptions) ? null : middlewareOrRouterOptions;
    // Injectable()(target);
  };
}
