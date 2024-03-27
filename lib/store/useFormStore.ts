import { create } from "zustand";
import { defaultValues } from "@/lib/schema";

export interface DockerFormState {
  nodeVersion: string;
  env: string;
  database: string;
  packageManager: string;
  buildStagePackages: string;
  productionStagePackages: string;
  projectName: string;
  user: string;
  port: string;
  setForm: (form: Partial<DockerFormState>) => void;
}

export const useFormStore = create<DockerFormState>((set) => ({
  ...defaultValues,
  setForm: (form) => set((state) => ({ ...state, ...form })),
}));
