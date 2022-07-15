const formValidation = (formElement) => {
  const pristine = new Pristine(formElement);
  const isValid = pristine.validate();
  console.log(isValid);
};

export { formValidation };
