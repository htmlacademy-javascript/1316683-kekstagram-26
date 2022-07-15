const formValidation = (form) => {
  const inputHashTag = form.querySelector('.text__hashtags');
  const regexp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  // regexp.test(inputHashTag.value);

  const strArr = inputHashTag.value.split(' ');
  const isValid = strArr.every((str) => regexp.test(str));
  console.log(isValid);

  // const pristineConfig = {
  //   // class of the parent element where the error/success class is added
  //   classTo: 'form-group',
  //   errorClass: 'has-danger',
  //   successClass: 'has-success',
  //   // class of the parent element where error text element is appended
  //   errorTextParent: 'form-group',
  //   // type of element to create for the error text
  //   errorTextTag: 'div',
  //   // class of the error text element
  //   errorTextClass: 'text-help',
  // };

  // const pristine = new Pristine(form, pristineConfig, false);

  // const isValid = pristine.validate();
  // console.log(isValid);
};

export { formValidation };
