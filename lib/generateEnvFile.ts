import { randomBytes } from "crypto";
import { DockerComposeFormState } from "./store/userDockerComposeStore"; // Adjust the import path as needed

export const generateEnvFile = (
  config: DockerComposeFormState,
  port: string
): string => {
  return `HOST=0.0.0.0
PORT=${port || 1337}
APP_KEYS=${generateSecret(12)},${generateSecret(12)},${generateSecret(12)}
API_TOKEN_SALT=${generateSecret()}
ADMIN_JWT_SECRET=${generateSecret()}
TRANSFER_TOKEN_SALT=${generateSecret()}
# Database
DATABASE_CLIENT=${config.database}
DATABASE_USERNAME=${config.databaseUser}
DATABASE_PASSWORD=${config.databasePassword}
DATABASE_PORT=${config.databasePort}
`;
};

const generateSecret = (bytes = 32) => randomBytes(bytes).toString("hex");
