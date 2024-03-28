import { create } from "zustand";
import { defaultDockerComposeValues } from "../schema";

export interface DockerComposeFormState {
  projectName: string;
  database: "sqlite" | "mariadb" | "mysql" | "postgres";
  databaseUser: string;
  databasePassword: string;
  databasePort: string;
  setDockerComposeForm: (form: Partial<DockerComposeFormState>) => void;
}

// Create the store
export const useDockerComposeFormStore = create<DockerComposeFormState>(
  (set) => ({
    ...defaultDockerComposeValues,
    setDockerComposeForm: (form) => set((state) => ({ ...state, ...form })),
  })
);
