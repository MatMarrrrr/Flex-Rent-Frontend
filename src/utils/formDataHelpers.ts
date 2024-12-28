export const createFormData = (values: Record<string, any>): FormData => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(values)) {
    formData.append(key, value);
  }

  return formData;
};
