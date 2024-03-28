import { create } from "zustand";
import { defaultDockerFormValues } from "@/lib/schema";

export interface DockerFormState {
  nodeVersion: string;
  env: string;
  packageManager: string;
  buildStagePackages: string;
  productionStagePackages: string;
  projectName: string;
  user: string;
  port: string;
  setForm: (form: Partial<DockerFormState>) => void;
}

export const useFormStore = create<DockerFormState>((set) => ({
  ...defaultDockerFormValues,
  setForm: (form) => set((state) => ({ ...state, ...form })),
}));
