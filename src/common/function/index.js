export const forceTextInputEnterNumber = (event) => {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
};

export const toPhoneNumberWithout84 = (value) => {
  return "0" + value.slice(3, value.length);
};

export const toPhoneNumberWith84 = (value) => {
  return "+84" + value.slice(1, value.length);
};
