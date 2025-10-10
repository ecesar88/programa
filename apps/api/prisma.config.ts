import path from "node:path";
import { defineConfig } from "prisma/config";

const rootDatabasePath = ["src", "database"];
const MIGRATIONS_PATH = [...rootDatabasePath, "prisma", "migrations"];
const SCHEMA_PATH = [...rootDatabasePath, "prisma", "schema.prisma"];

import "dotenv/config";

export default defineConfig({
	schema: path.join(...SCHEMA_PATH),
	migrations: {
		path: path.join(...MIGRATIONS_PATH),
		seed: "pnpm ts-node-dev src/seeds/index.ts",
	},
});
