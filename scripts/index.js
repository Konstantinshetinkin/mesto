import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
import { openPopup, popupImage, closePopup } from "./utils.js";

//**********************************************************
const popupEditProfile = document.querySelector(".popup__edit-profile");
const popupAddCard = document.querySelector(".popup__add-card");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonCloseImage = document.querySelector(".popup__close-icon_image");
const buttonEditClose = document.querySelector(".popup__close-icon_edit");
const buttonAddClose = document.querySelector(".popup__close-icon_add");
const profileName = document.querySelector(".profile__name");
const profileHobby = document.querySelector(".profile__hobby");
const fieldName = document.querySelector(".popup__field_type_name");
const fieldHobby = document.querySelector(".popup__field_type_hobby");
const formProfileElement = document.querySelector(".popup__form_edit");
const cardsContainer = document.querySelector(".elements");
const formElementAdd = document.querySelector(".popup__form_add");
const nameMesto = formElementAdd.querySelector(".popup__field_type_name-mesto");
const imageAddress = formElementAdd.querySelector(
  ".popup__field_type_image-address"
);
const buttonAddCard = popupAddCard.querySelector(".popup__submit-button");
//**********************************************************  creating cards from initialCards
const addElement = (link, name) => {
  const card = new Card(link, name);
  const cardElement = card.creatCard();
  cardsContainer.prepend(cardElement);
};

initialCards.forEach((item) => addElement(item.link, item.name));

//**********************************************************

//**********************************************************
buttonEdit.addEventListener("click", function () {
  openPopup(popupEditProfile);
  fieldName.value = profileName.textContent;
  fieldHobby.value = profileHobby.textContent;
  formList.forEach((formElement) => {
    const newCardFormValidator = new FormValidator(config,formElement)
    newCardFormValidator.resetForm();
  })
  
});

buttonEditClose.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

formProfileElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = fieldName.value;
  profileHobby.textContent = fieldHobby.value;
  closePopup(popupEditProfile);
});

buttonAdd.addEventListener("click", function () {
  openPopup(popupAddCard);
  
  formList.forEach((formElement) => {
    const newCardFormValidator = new FormValidator(config,formElement)
    newCardFormValidator.resetForm();
  })
});

buttonCloseImage.addEventListener("click", () => {
  closePopup(popupImage);
});

buttonAddClose.addEventListener("click", function () {
  closePopup(popupAddCard);
  formElementAdd.reset();
});

const handleElementSubmit = (evt) => {
  evt.preventDefault();
  const link = imageAddress.value;
  const name = nameMesto.value;
  addElement(link, name);
  formElementAdd.reset();
  closePopup(popupAddCard);
};

formElementAdd.addEventListener("submit", handleElementSubmit);
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__submit-button",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__field-error_active",
};

const formElement = document.querySelectorAll(config.formSelector);
const formList = Array.from(formElement);
formList.forEach((formElement) => {
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();

});

