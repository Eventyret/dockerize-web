import { DockerComposeFormState } from "./store/userDockerComposeStore";

export const generateDockerComposeFile = (
  config: DockerComposeFormState
): string => {
  const { database, projectName } = config;

  const commonStrapiService = `
services:
  strapi:
    container_name: strapi
    build: .
    image: ${projectName || "strapi"}:latest
    restart: unless-stopped
    env_file: .env
    environment:
      DATABASE_CLIENT: $\{DATABASE_CLIENT}
      DATABASE_HOST: strapiDB
      DATABASE_PORT: $\{DATABASE_PORT}
      DATABASE_NAME: $\{DATABASE_NAME}
      DATABASE_USERNAME: $\{DATABASE_USERNAME}
      DATABASE_PASSWORD: $\{DATABASE_PASSWORD}
      JWT_SECRET: $\{JWT_SECRET}
      ADMIN_JWT_SECRET: $\{ADMIN_JWT_SECRET}
      APP_KEYS: $\{APP_KEYS}
      NODE_ENV: $\{NODE_ENV}
    volumes:
      - ./config:/opt/app/config
      - ./src:/opt/app/src
      - ./package.json:/opt/package.json
      - ./yarn.lock:/opt/yarn.lock
      - ./.env:/opt/app/.env
      - ./public/uploads:/opt/app/public/uploads
    ports:
      - "1337:1337"
    networks:
      - strapi
    depends_on:
      - strapiDB
`;

  let databaseService = "";

  // Switch between different database configurations
  switch (database) {
    case "mysql":
      databaseService = `
  strapiDB:
    container_name: strapiDB
    platform: linux/amd64
    restart: unless-stopped
    env_file: .env
    image: mysql:5.7
    command: --default-authentication-plugin=mysql_native_password
    environment:
      MYSQL_USER: $\{DATABASE_USERNAME}
      MYSQL_ROOT_PASSWORD: $\{DATABASE_PASSWORD}
      MYSQL_PASSWORD: $\{DATABASE_PASSWORD}
      MYSQL_DATABASE: $\{DATABASE_NAME}
    volumes:
      - strapi-data:/var/lib/mysql
    ports:
      - "$\{DATABASE_PORT}:$\{DATABASE_PORT}"
    networks:
      - strapi
`;
      break;
    case "mariadb":
      databaseService = `
  strapiDB:
    container_name: strapiDB
    platform: linux/amd64
    restart: unless-stopped
    env_file: .env
    image: mariadb:latest
    environment:
      MYSQL_USER: $\{DATABASE_USERNAME}
      MYSQL_ROOT_PASSWORD: $\{DATABASE_PASSWORD}
      MYSQL_PASSWORD: $\{DATABASE_PASSWORD}
      MYSQL_DATABASE: $\{DATABASE_NAME}
    volumes:
      - strapi-data:/var/lib/mysql
    ports:
      - "$\{DATABASE_PORT}:$\{DATABASE_PORT}"
    networks:
      - strapi
`;
      break;
    case "postgres":
      databaseService = `
  strapiDB:
    container_name: strapiDB
    platform: linux/amd64
    restart: unless-stopped
    env_file: .env
    image: postgres:12.0-alpine
    environment:
      POSTGRES_USER: $\{DATABASE_USERNAME}
      POSTGRES_PASSWORD: $\{DATABASE_PASSWORD}
      POSTGRES_DB: $\{DATABASE_NAME}
    volumes:
      - strapi-data:/var/lib/postgresql/data/
    ports:
      - "$\{DATABASE_PORT}:$\{DATABASE_PORT}"
    networks:
      - strapi
`;
      break;
    default:
      throw new Error("Unsupported database type");
  }

  return `version: "3"
${commonStrapiService}${databaseService}
volumes:
  strapi-data:

networks:
  strapi:
    name: strapi
    driver: bridge
`;
};
