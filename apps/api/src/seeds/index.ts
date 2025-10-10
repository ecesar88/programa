import { PrismaClient } from "@prisma/client";
import { createClients } from "./client.seed";
import { createMenuEntries } from "./menuEntry.seed";

async function main(): Promise<void> {
	const prisma = new PrismaClient();

	await createClients(prisma);
	await Promise.all(await createMenuEntries(prisma));
}

main();
