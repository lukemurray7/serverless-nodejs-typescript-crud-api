export const validateRequest = (body: string, requiredKeys: string[]): boolean => {
  if (!body) {
    return false;
  }

  let isValidRequest = true;
  requiredKeys.forEach((key: string) => {
    if (!JSON.parse(body)[key]) {
      isValidRequest = false;
    }
  })
  return isValidRequest;
};
