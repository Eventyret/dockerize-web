import { z } from "zod";
import { getRandomName } from "./random-app-name";

export const dockerFormSchema = z.object({
  nodeVersion: z.string().default("18"),
  env: z.enum(["development", "production"]).default("development"),
  packageManager: z.enum(["npm", "yarn"]).default("yarn"),
  buildStagePackages: z
    .string()
    .default(
      [
        "build-base",
        "gcc",
        "autoconf",
        "automake",
        "zlib-dev",
        "libpng-dev",
        "vips-dev",
        "git",
      ].join(" ")
    ),
  productionStagePackages: z.string().default("vips-dev"),
  user: z.string().default("node"),
  port: z.string().default("1337"),
  projectName: z.string().default(getRandomName()),
});

export const dockerComposeFormSchema = z.object({
  projectName: z.string().default(getRandomName()),
  database: z.enum(["mariadb", "mysql", "postgres"]).default("postgres"),
  databaseUser: z.string().default("strapi"),
  databasePassword: z.string().default("strapi"),
  databasePort: z.string().default(() => {
    return {
      mariadb: "3306",
      mysql: "3306",
      postgres: "5432",
    }["postgres"];
  }),
});

export const nodeVersionOptions = ["16", "18", "20"];

export const defaultDockerFormValues = dockerFormSchema.parse({});
export const defaultDockerComposeValues = dockerComposeFormSchema.parse({});
