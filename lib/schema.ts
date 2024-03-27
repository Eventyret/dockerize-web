import { z } from "zod";
import { getRandomName } from "./random-app-name";

export const FormSchema = z.object({
  nodeVersion: z.string().default("18"),
  env: z.enum(["development", "production"]).default("development"),
  database: z
    .enum(["sqlite", "mariadb", "mysql", "postgres"])
    .default("postgres"),
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

export const nodeVersionOptions = ["16", "18", "20"];

export const defaultValues = FormSchema.parse({});
