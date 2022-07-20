const popupImage = document.querySelector(".popup__open-image");

const openImagePopup = (name, link) => {
  const cardImage = popupImage.querySelector(".popup__image");
  const cardTitle = popupImage.querySelector(".popup__image-title");
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  openPopup(popupImage);
};
function openPopup(popupElement) {
  popupElement.classList.add("popup__opened");
  document.addEventListener("keydown", closeButtonEsc);
  popupElement.addEventListener("click", detectClickOverlay);

}
const closeButtonEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup__opened");
    closePopup(popupOpened);
  }
};
function closePopup(popupElement) {
  popupElement.classList.remove("popup__opened");
  document.removeEventListener("click", closeButtonEsc);
  popupElement.removeEventListener("click", detectClickOverlay);
}
function detectClickOverlay(evt) {
  if (evt.target.classList.contains("overlay")) {
    closePopup(evt.currentTarget);
    document.querySelector(".popup__form_add").reset();
  }
}

export { openImagePopup, closeButtonEsc, openPopup, closePopup, popupImage };
