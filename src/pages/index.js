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
  host,
  token
} from "../utils/constants.js";
import { Card } from "../ components/Сard.js";
import { FormValidator } from "../ components/FormValidator.js";
import { Section } from "../ components/Section.js";
import { PopupWithImage } from "../ components/PopupWithImage.js";
import { PopupWithForm } from "../ components/PopupWithForm";
import { PopupTypeDeleteCard } from "../ components/PopupTypeDeleteCard";
import { UserInfo } from "../ components/UserInfo.js";
import { Api } from "../ components/Api.js"


//************************ Creating cards ****************************
const api = new Api(host,token)
api.getCards()
  .then((items)=>{
    sectionCards.renderItems(items);
  })

api.getUser().then((info)=>{
    user.setUserInfo(info)
})

  const sectionCards = new Section(
    {
      items: [],
      renderer: (item) => {
        createElement(item);
        addElement(item);
      },
    },
    ".elements"
  );

function createElement(item) {
  const card = new Card(item, ".elements__template", handleCardClick,deleteClick);
  const cardElement = card.creatCard();
  return cardElement;
}

function addElement(item) {
  api.createCard(item).then((item)=>{
    const element = createElement(item);
    sectionCards.addItem(element);
  })
}
function deleteClick(id) {
  popupTypeDeleteCard.open()
  popupTypeDeleteCard.changeDeleteClik(()=> {
    return api.deleteCardFromServer(id).then(res => {
       card.deleteCard();
       popupTypeDeleteCard.close()
    });
  })
}
//*********************** Popups ************************************

const popupOpenImage = new PopupWithImage(".popup__open-image");
const popupEditForm = new PopupWithForm(".popup__edit-profile", submitEditFotm);
const popupAddForm = new PopupWithForm(".popup__add-card", handleElementSubmit);
const popupTypeDeleteCard = new PopupTypeDeleteCard(".popup__type-delete-card");

const user = new UserInfo({
  profileName: ".profile__name",
  profileInfo: ".profile__hobby",
});

//************************ Functions *********************************
popupOpenImage.setEventListeners();
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();
popupTypeDeleteCard.setEventListeners()

function handleCardClick(card) {
  popupOpenImage.open(card);
}
function handleElementSubmit(item) {
  addElement(item);
  popupAddForm.close();
}
function submitEditFotm(data) {
  api.setUser(data).then((data) => {
    user.setUserInfo(data);
  })
  popupEditForm.close();
}

//********************************************************************

buttonAdd.addEventListener("click", function () {
  popupAddForm.open();
  cardValidation.resetValidation();
});

buttonEdit.addEventListener("click", function () {
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