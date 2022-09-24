//************************ Import **********************************

import "./../pages/index.css";
import {
  buttonEdit,
  buttonAdd,
  formElementAddAvatar,
  avatar,
  fieldName,
  fieldHobby,
  formProfileElement,
  formElementAdd,
  config,
  host,
  token,
} from "../utils/constants.js";
import { Card } from "../ components/Сard.js";
import { FormValidator } from "../ components/FormValidator.js";
import { Section } from "../ components/Section.js";
import { PopupWithImage } from "../ components/PopupWithImage.js";
import { PopupWithForm } from "../ components/PopupWithForm";
import { PopupTypeDeleteCard } from "../ components/PopupTypeDeleteCard";
import { UserInfo } from "../ components/UserInfo.js";
import { Api } from "../ components/Api.js";
import { PopupEditAvatar } from "../ components/PopupEditAvatar";

//************************ Creating cards ****************************
const api = new Api(host, token);
api.getCards().then((items) => {
  sectionCards.renderItems(items);
});
let userId;

api.getUser().then((info) => {
  userId = info._id;
  user.setUserInfo(info);
});

const sectionCards = new Section(
  {
    renderer: (item) => {
      const card = createElement(item);
      sectionCards.addItem(card);
    },
  },
  ".elements"
);

function createElement(item) {
  const card = new Card(
    item,
    userId,
    ".elements__template",
    handleCardClick,
    (id) => {
      popupTypeDeleteCard.open();
      popupTypeDeleteCard.changeDeleteClik(() => {
        return api.deleteCardFromServer(id).then(() => {
          card.deleteCard();
          popupTypeDeleteCard.close();
        });
      });
    },
    () => {
      if (card.isLiked()) {
        api.deleteLike(item._id).then((res) => {
          card.setLikes(res.likes);
        });
      } else {
        api.addLike(item._id).then((res) => {
          card.setLikes(res.likes);
        });
      }
    }
  );
  const cardElement = card.creatCard();
  return cardElement;
}

function addElement(item) {
  popupAddForm.loading(true);
  api
    .createCard(item)
    .then((item) => {
      const element = createElement(item);
      sectionCards.addItem(element);
    })
    .finally(() => {
      popupAddForm.loading(false);
    });
}

//*********************** Popups ************************************

const popupOpenImage = new PopupWithImage(".popup__open-image");
const popupEditForm = new PopupWithForm(".popup__edit-profile", submitEditFotm);
const popupAddForm = new PopupWithForm(".popup__add-card", handleElementSubmit);
const popupTypeDeleteCard = new PopupTypeDeleteCard(".popup__type-delete-card");
const popupNewAvatar = new PopupEditAvatar(
  ".popup__new-avatar",
  addAvatarFromServer
);

const user = new UserInfo({
  profileName: ".profile__name",
  profileInfo: ".profile__hobby",
  profileAvatar: ".profile__avatar",
});

//************************ Functions *********************************
popupOpenImage.setEventListeners();
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();
popupTypeDeleteCard.setEventListeners();
popupNewAvatar.setEventListeners();

function addAvatarFromServer(link) {
  popupNewAvatar.loading(true);
  api
    .setAvatar(link)
    .then((res) => {
      user.setUserAvatar(res.avatar);
    })
    .finally(() => {
      popupNewAvatar.loading(false);
    });
  popupNewAvatar.close();
}

function handleCardClick(card) {
  popupOpenImage.open(card);
}
function handleElementSubmit(item) {
  addElement(item);
  popupAddForm.close();
}
function submitEditFotm(data) {
  popupEditForm.loading(true);
  api
    .setUser(data)
    .then((data) => {
      user.setUserInfo(data);
    })
    .finally(() => {
      popupEditForm.loading(false);
    });
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

avatar.addEventListener("click", function () {
  popupNewAvatar.open();
  avatarValidation.resetValidation();
});

//************************* Validation Forms ***************************

const profileValidation = new FormValidator(config, formProfileElement);
const cardValidation = new FormValidator(config, formElementAdd);
const avatarValidation = new FormValidator(config, formElementAddAvatar);
profileValidation.enableValidation();
cardValidation.enableValidation();
avatarValidation.enableValidation();

//**********************************************************************
