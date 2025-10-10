import z from "zod";

const PORT = 8000;

const environmentSchema = z.object({
	APP_NAME: z.string(),
	SERVER_PORT: z.coerce.number().default(PORT),
	SERVER_HOSTNAME: z.string(),
	DATABASE_URL: z.url(),
	NODE_ENV: z.enum(["development", "production"]).default("development"),
});

export const env = environmentSchema.parse(process.env);
