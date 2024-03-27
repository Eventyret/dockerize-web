type DockerfileHelpTexts = {
  [lineRange: string]: string;
};

export const generateDockerfile = (nodeVersion: string, environment: string, packageManager: string): string => {
  const baseCommands = `FROM node:${nodeVersion}-alpine
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
ARG NODE_ENV=${environment}
ENV NODE_ENV=\${NODE_ENV}
WORKDIR /opt/
COPY package.json yarn.lock ./
RUN ${packageManager === "yarn" ? "yarn global add node-gyp" : "npm install -g node-gyp"}
RUN ${packageManager} config set network-timeout 600000 -g && ${packageManager} install${environment === "production" ? " --production" : ""}
ENV PATH /opt/node_modules/.bin:\$PATH
WORKDIR /opt/app
COPY . .
RUN chown -R node:node /opt/app
USER node`;

  const devCommands = `
RUN [${packageManager === "yarn" ? "yarn build" : "npm run build"}]
EXPOSE 1337
CMD ["${packageManager}", "develop"]`;

  const prodCommands = `
RUN [${packageManager === "yarn" ? "yarn build" : "npm run build"}]

# Creating final production image
FROM node:${nodeVersion}-alpine
RUN apk add --no-cache vips-dev
COPY --from=build /opt/node_modules ./node_modules
COPY --from=build /opt/app ./
RUN chown -R node:node /opt/app
EXPOSE 1337
CMD ["${packageManager}", "start"]`;

  return `${baseCommands}${environment === "development" ? devCommands : prodCommands}`;
};