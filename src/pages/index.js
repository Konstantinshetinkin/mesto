//************************ Import **********************************

import "./../pages/index.css";
import {
  buttonEdit,
  buttonAdd,
  fieldName,
  fieldHobby,
  formProfileElement,
  formElementAdd,
  config,
  initialCards,
} from "../utils/constants.js";
import { Card } from "../ components/Сard.js";
import { FormValidator } from "../ components/FormValidator.js";
import { Section } from "../ components/Section.js";
import { Popup } from "../ components/Popup.js";
import { PopupWithImage } from "../ components/PopupWithImage.js";
import { PopupWithForm } from "../ components/PopupWithForm";
import { UserInfo } from "../ components/UserInfo.js";

//************************ Creating cards ****************************

const sectionCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      createElement(item);
      addElement(item);
    },
  },
  ".elements"
);

sectionCards.renderItems();

function createElement(item) {
  const card = new Card(item, ".elements__template", handleCardClick);
  const cardElement = card.creatCard();
  return cardElement;
}
function addElement(item) {
  const element = createElement(item);
  sectionCards.addItem(element);
}

//*********************** Popups ************************************

const popupOpenImage = new PopupWithImage(".popup__open-image");
const popupEditForm = new PopupWithForm(".popup__edit-profile", submitEditFotm);
const popupAddForm = new PopupWithForm(".popup__add-card", handleElementSubmit);
const user = new UserInfo({
  profileName: ".profile__name",
  profileInfo: ".profile__hobby",
});

//************************ Functions *********************************
// popupAddCard.setEventListeners();
popupOpenImage.setEventListeners();
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();

function handleCardClick(card) {
  popupOpenImage.open(card);
}
function handleElementSubmit(item) {
  addElement(item);
  popupAddForm.close();
}
function submitEditFotm(data) {
  user.setUserInfo(data);
  popupEditForm.close();
}

//********************************************************************

buttonAdd.addEventListener("click", function () {
  popupAddForm.open();
  cardValidation.resetValidation();
});

buttonEdit.addEventListener("click", function () {
  // popupEditProfile.open();
  popupEditForm.open();
  const info = user.getUserInfo();
  fieldName.value = info.elementName;
  fieldHobby.value = info.elementInfo;
  profileValidation.resetValidation();
});

//************************* Validation Forms ***************************

const profileValidation = new FormValidator(config, formProfileElement);
const cardValidation = new FormValidator(config, formElementAdd);
profileValidation.enableValidation();
cardValidation.enableValidation();

//**********************************************************************
