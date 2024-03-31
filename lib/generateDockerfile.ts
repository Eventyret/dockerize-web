// Importing the necessary type for config parameter
import { DockerFormState } from "@/lib/store/useFormStore";

// Function to generate Dockerfile based on given configuration
export const generateDockerfile = (config: DockerFormState): string => {
  // Destructuring config to extract all necessary fields
  const {
    nodeVersion,
    env,
    packageManager,
    user = "node",
    port = 1337,
  } = config;

  // Base commands for initial setup, applicable to both development and production environments
  const baseCommands = `FROM node:${nodeVersion}-alpine
# Installing libvips-dev for sharp compatibility and other dependencies
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
ARG NODE_ENV=${env}
ENV NODE_ENV=\${NODE_ENV}

WORKDIR /opt/
COPY package.json ${
    packageManager === "yarn" ? "yarn.lock" : "package-lock.json"
  } ./
RUN ${
    packageManager === "yarn"
      ? "yarn config set network-timeout 600000 -g && yarn install"
      : "npm config set fetch-retry-maxtimeout 600000 -g && npm install"
  }${env === "production" ? " --production" : ""}
ENV PATH /opt/node_modules/.bin:\$PATH
WORKDIR /opt/app
COPY . .
RUN chown -R ${user}:${user} /opt/app
USER ${user}`;

  // Commands specific to development environment
  const devCommands = `
EXPOSE ${port}
CMD ["${packageManager}", "develop"]`;

  // Commands for production environment, including multi-stage build
  const prodCommands = `
FROM node:${nodeVersion}-alpine as build
RUN apk add --no-cache vips-dev
COPY --from=0 /opt/node_modules ./node_modules
COPY --from=0 /opt/app ./
RUN chown -R ${user}:${user} /opt/app
EXPOSE ${port}
CMD ["${packageManager}", "start"]`;

  // Returning the final Dockerfile content based on the environment
  return `${baseCommands}${env === "development" ? devCommands : prodCommands}`;
};
