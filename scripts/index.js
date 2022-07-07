const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const popupEditProfile = document.querySelector(".popup__edit-profile");
const popupAddCard = document.querySelector(".popup__add-card");

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

const buttonEditClose = document.querySelector(".popup__close-icon_edit");
const buttonAddClose = document.querySelector(".popup__close-icon_add");

const profileName = document.querySelector(".profile__name");
const profileHobby = document.querySelector(".profile__hobby");

const fieldName = document.querySelector(".popup__field_type_name");
const fieldHobby = document.querySelector(".popup__field_type_hobby");

const formProfileElement = document.querySelector(".popup__form_edit");

const cardsContainer = document.querySelector(".elements");
const elementTemplate = document.querySelector(".elements__template");
const getElementByEvent = (evt) => evt.currentTarget.closest(".element");
const deleteElement = (evt) => {
  const element = getElementByEvent(evt);
  element.remove();
};

const likeActive = (evt) =>
  evt.currentTarget.classList.toggle("element__like_active");

const popupImage = document.querySelector(".popup__open-image");

const creatElement = (linkImage, mestoName) => {
  const element = elementTemplate.content
    .cloneNode(true)
    .querySelector(".element");
  const elementFoto = element.querySelector(".element__foto");
  element.querySelector(".element__title").textContent = mestoName;
  elementFoto.src = linkImage;
  elementFoto.alt = mestoName;
  element
    .querySelector(".element__trash")
    .addEventListener("click", deleteElement);
  element.querySelector(".element__like").addEventListener("click", likeActive);
  elementFoto.addEventListener("click", (evt) => {
    openImagePopup(evt);
  });

  return element;
};

const cardImage = popupImage.querySelector(".popup__image");
const cardTitle = popupImage.querySelector(".popup__image-title");

function openImagePopup(evt) {
  const element = getElementByEvent(evt);
  cardImage.src = element.querySelector(".element__foto").src;
  cardImage.alt = element.querySelector(".element__title").textContent;
  cardTitle.textContent = element.querySelector(".element__title").textContent;

  openPopup(popupImage);
}
const buttonCloseImage = document.querySelector(".popup__close-icon_image");
buttonCloseImage.addEventListener("click", () => {
  closePopup(popupImage);
});

const addElement = (linkImage, mestoName) => {
  const element = creatElement(linkImage, mestoName);
  cardsContainer.prepend(element);
};
initialCards.forEach((card) => addElement(card.link, card.name));

function openPopup(popupElement) {
  popupElement.classList.add("popup__opened");
  document.addEventListener("keydown", closeButtonEsc);
  popupElement.addEventListener("click", detectClickOverlay);
}
function closePopup(popupElment) {
  popupElment.classList.remove("popup__opened");
  document.removeEventListener("click", closeButtonEsc);
}

const closeButtonEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup__opened");
    closePopup(popupOpened);
  }
};
function detectClickOverlay(evt) {
  if (evt.target.classList.contains("overlay")) {
    const popupOpened = document.querySelector(".popup__opened");
    closePopup(popupOpened);
  }
}

buttonEdit.addEventListener("click", function () {
  openPopup(popupEditProfile);
  fieldName.value = profileName.textContent;
  fieldHobby.value = profileHobby.textContent;
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
  disableButton(buttonAddCard);
});
buttonAddClose.addEventListener("click", function () {
  closePopup(popupAddCard);
  formElementAdd.reset();
});

const formElementAdd = document.querySelector(".popup__form_add");
const nameMesto = formElementAdd.querySelector(".popup__field_type_name-mesto");
const imageAddress = formElementAdd.querySelector(
  ".popup__field_type_image-address"
);
const buttonAddCard = popupAddCard.querySelector(".popup__submit-button");
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
enableValidation(config);
