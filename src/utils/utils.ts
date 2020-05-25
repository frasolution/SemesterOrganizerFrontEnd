export const isInputEmpty = (inputLength: number) => inputLength <= 0;

export const validateInput = (inputLength: number, minLength: number, maxLength: number) => {
  const isEmpty = isInputEmpty(inputLength);
  const isTooLong = inputLength > maxLength;
  const isValid = !isEmpty && !isTooLong;

  return { isEmpty, isTooLong, isValid };
};

export const alertWithInternalServerError = (error: any) => {
  alert("Internal Server Error");
  console.log(error);
};
