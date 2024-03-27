type FormData = {
  [key: string]: string;
};

let formData: FormData = {};

export const getFormData = (): FormData => {
  return formData;
};

export const setFormData = (newFormData: FormData): void => {
  formData = {
    ...formData,
    ...newFormData,
  };
};
