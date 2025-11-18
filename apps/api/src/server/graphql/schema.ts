import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { writeFileSync } from "node:fs";

import { printSchema } from "graphql";
import { builder } from "./builder";

import "./schema/car/operations";
import "./schema/car/types";

import "./schema/auth/operations";
import "./schema/auth/types";

import "./schema/user/operations";
import "./schema/user/types";

import "./schema/address/operations";
import "./schema/address/types";

import "./schema/contact/operations";
import "./schema/contact/types";

import "./schema/order/operations";
import "./schema/order/types";

import "./schema/client/operations";
import "./schema/client/types";

import "./schema/menu/operations";
import "./schema/menu/types";

import "./schema/_errors/errors";
import "./schema/_errors/objects";

import "./schema/healthcheck/types";

builder.queryType({});
builder.mutationType({});

export const schema = builder.toSchema();

// Write the graphql schema to a file so that we can use it on graphql-codegen
writeFileSync(path.join(__dirname, "schema.graphql"), printSchema(schema));
