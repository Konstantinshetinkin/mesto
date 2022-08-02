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

const popupAddCard = new Popup(".popup__add-card");
const popupEditProfile = new Popup(".popup__edit-profile");
const popupOpenImage = new PopupWithImage(".popup__open-image");

//*********************** Forms *************************************

const popupEditForm = new PopupWithForm(".popup__form_edit", submitEditFotm);
const popupAddForm = new PopupWithForm(".popup__form_add", handleElementSubmit);
const user = new UserInfo({
  profileName: ".profile__name",
  profileInfo: ".profile__hobby",
});

//************************ Functions *********************************
popupAddCard.setEventListeners();
popupOpenImage.setEventListeners();
popupEditProfile.setEventListeners();
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();

function handleCardClick(card) {
  popupOpenImage.open(card);
}
function handleElementSubmit(item) {
  addElement(item);
  popupAddCard.close();
}
function submitEditFotm(data) {
  user.setUserInfo(data);
  popupEditProfile.close();
}

//********************************************************************

buttonAdd.addEventListener("click", function () {
  popupAddCard.open();
  popupAddForm.close();
  cardValidation.resetValidation();
});

buttonEdit.addEventListener("click", function () {
  popupEditProfile.open();
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
