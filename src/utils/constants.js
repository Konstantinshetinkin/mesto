//************************ Constants **********************************

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const fieldName = document.querySelector(".popup__field_type_name");
const fieldHobby = document.querySelector(".popup__field_type_hobby");
const formProfileElement = document.querySelector(".popup__form_edit");
const formElementAdd = document.querySelector(".popup__form_add");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__submit-button",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__field-error_active",
};
const host = 'https://mesto.nomoreparties.co/v1/cohort-50';
const token ='722af578-3e81-4a0f-a886-d6ad0c355458';

export {
  buttonEdit,
  buttonAdd,
  fieldName,
  fieldHobby,
  formProfileElement,
  formElementAdd,
  config,
  host,
  token
};
