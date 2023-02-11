export const validateName = (nameValue: string) => {
  return nameValue.match(/^[a-zA-Z ]*$/);
};

export const validateAge = (value: string) => {
  return value.match(/^[0-9]*$/) && +value <= 100;
};
