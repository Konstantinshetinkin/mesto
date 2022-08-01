//************************ Import **********************************

import "./../pages/index.css"
import { Card } from "../ components/Сard.js";
import { FormValidator } from "../ components/FormValidator.js";
import { initialCards} from "../ components/initialCards.js";
import { Section } from "../ components/Section.js";
import { Popup } from "../ components/Popup.js";
import { PopupWithImage } from "../ components/PopupWithImage.js";
import { PopupWithForm } from "../ components/PopupWithForm";
import { UserInfo } from "../ components/UserInfo.js";

//************************ Constants **********************************

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const fieldName = document.querySelector(".popup__field_type_name");
const fieldHobby = document.querySelector(".popup__field_type_hobby");
const formProfileElement = document.querySelector(".popup__form_edit");
const formElementAdd = document.querySelector(".popup__form_add");

//************************ Creating cards **************************** 

const initialCard = new Section({
  items: initialCards,
  renderer:(item) =>{
    creatElement(item);
  }
},'.elements');

initialCard.renderItem();

function creatElement (item){
  const card = new Card(item, ".elements__template",handleCardClick);
  const cardElement = card.creatCard();
  initialCard.addItem(cardElement)
};
//*********************** Popups ************************************

const popupAddCard = new Popup ('.popup__add-card');
const popupEditProfile = new Popup ('.popup__edit-profile');
const popupOpenImage = new PopupWithImage('.popup__open-image');

//*********************** Forms *************************************

const popupEditForm = new PopupWithForm('.popup__form_edit',submitEditFotm);
const popupAddForm = new PopupWithForm('.popup__form_add',handleElementSubmit);
const user = new UserInfo({profileName:'.profile__name',profileInfo:'.profile__hobby'})


//************************ Functions ********************************* 
popupAddForm.setEventListeners();
popupEditForm.setEventListeners()


function handleCardClick(card){
  popupOpenImage.open(card)
};
function handleElementSubmit(item){
  creatElement(item);
  popupAddCard.close();
};
function submitEditFotm(data){
  user.setUserInfo(data)
  popupEditProfile.close();
}

//********************************************************************

buttonAdd.addEventListener("click", function () {
  popupAddCard.open();
  popupAddForm.close();
  cardValidation.resetForm();
});

buttonEdit.addEventListener("click", function () {
  popupEditProfile.open();
  const info = user.getUserInfo()
  fieldName.value = info.elementName
  fieldHobby.value = info.elementInfo
  profileValidation.resetForm();
});

//************************* Validation Forms ***************************

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__submit-button",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__field-error_active",
};

const profileValidation = new FormValidator(config, formProfileElement);
const cardValidation = new FormValidator(config, formElementAdd);
profileValidation.enableValidation();
cardValidation.enableValidation();

//**********************************************************************