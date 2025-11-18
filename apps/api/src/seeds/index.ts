import { PrismaClient } from "@prisma/client";
import { createClients } from "./client";
import { createMenuEntries } from "./menuEntry";

async function main(): Promise<void> {
	const prisma = new PrismaClient();

	await createClients(prisma);
	await Promise.all(await createMenuEntries(prisma));
}

main();
