import { DockerFormState } from "@/lib/store/useFormStore";

export const generateDockerfile = (config: DockerFormState): string => {
  const {
    nodeVersion,
    env,
    packageManager,
    buildStagePackages,
    productionStagePackages,
    user,
    port,
  } = config;

  const baseCommands = `# Setup stage
FROM node:${nodeVersion}-alpine AS base
# Installing libvips-dev for sharp Compatibility
RUN apk add --no-cache vips-dev

ARG NODE_ENV=${env}
ENV NODE_ENV=\${NODE_ENV}

RUN mkdir -p /opt/app
RUN chown -R ${user || "node"}:${user || "node"} /opt/app
USER node
WORKDIR /opt/app

COPY package.json yarn.lock tsconfig.json favicon.png ./
RUN ${
    packageManager === "yarn"
      ? "yarn global add node-gyp"
      : "npm install -g node-gyp"
  }
RUN ${packageManager} config set network-timeout 600000 -g && ${packageManager} install --production
ENV PATH="/opt/node_modules/.bin:$PATH"`;

  const devCommands = `
# Final image
FROM base

RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash git

COPY . .

RUN ${packageManager} config set network-timeout 600000 -g && ${packageManager} install
RUN ${packageManager === "yarn" ? "yarn build" : "npm run build"}

EXPOSE ${port || 1337}

CMD ["${packageManager}", "develop"]`;

  const prodCommands = `
# Build stage
FROM base AS build

RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash git

COPY . .

RUN ${packageManager} config set network-timeout 600000 -g && ${packageManager} install
RUN ${packageManager === "yarn" ? "yarn build" : "npm run build"}

# Final image
FROM base

COPY --from=build /opt/app/.strapi ./.strapi
COPY --from=build /opt/app/database ./database
COPY --from=build /opt/app/dist ./dist
COPY --from=build /opt/app/public ./public

EXPOSE ${port || 1337}

CMD ["${packageManager}", "start"]`;

  return `${baseCommands}${env === "development" ? devCommands : prodCommands}`;
};
