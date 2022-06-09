

const popupEditProfile=document.querySelector('.popup__edit-profile');
const popupAddCard=document.querySelector('.popup__add-card');

const editButton=document.querySelector('.profile__edit-button');
const addButton=document.querySelector('.profile__add-button')

const closeButtonEdit=document.querySelector('.popup__close-icon_edit');
const closeButtonAdd=document.querySelector('.popup__close-icon_add');

const profileName=document.querySelector('.profile__name');
const profileHobby=document.querySelector('.profile__hobby');

const nameField=document.querySelector('.popup__field_type_name');
const hobbyField=document.querySelector('.popup__field_type_hobby');

const formElement=document.querySelector('.popup__form_edit')



const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 


const elementlist=document.querySelector('.elements');
const elementTemplate=document.querySelector('.elements__template');
const getElementByEvent= evt => evt.currentTarget.closest ('.element');
const deleteElement =evt =>{
    const element = getElementByEvent(evt);
    element.remove()};

const likeActive = evt => 
evt.currentTarget.classList.toggle('element__like_active');

const popupImage =document.querySelector('.popup__open-image');
const creatElement = (linkImage,mestoName) => {
    const element = elementTemplate.content
    .cloneNode(true)
    .querySelector('.element');

    element.querySelector('.element__title').textContent = mestoName;
    element.querySelector('.element__foto').src = linkImage;
    element.querySelector('.element__trash').addEventListener('click',deleteElement);
    element.querySelector('.element__like').addEventListener('click',likeActive);   

    element.querySelector('.element__foto').addEventListener('click',evt =>{openImagePopup(evt)});
  

    return element; 
};

function openImagePopup(evt){
  const element = getElementByEvent(evt);
    popupImage.querySelector('.popup__image').src = element.querySelector('.element__foto').src;
    popupImage.querySelector('.popup__image-title').textContent = element.querySelector('.element__title').textContent;
    openPopup(popupImage);
    
}
const closeButtonImage=document.querySelector('.popup__close-icon_image')
closeButtonImage.addEventListener('click',()=>{
  closePopup(popupImage)
})


const addElement= (linkImage,mestoName) => {
    const Element = creatElement(linkImage,mestoName);
    elementlist.prepend(Element);
};
initialCards.forEach(card => addElement(card.link, card.name));

function openPopup(popupElement){
    popupElement.classList.add('popup__opened')
    
};
function closePopup(popupElment){
    popupElment.classList.remove('popup__opened')
};


editButton.addEventListener('click',function(){
    openPopup(popupEditProfile);
    nameField.value = profileName.textContent;
    hobbyField.value = profileHobby.textContent;
});

closeButtonEdit.addEventListener('click',function(){
    closePopup(popupEditProfile);
});

formElement.addEventListener('submit',function(evt){
    evt.preventDefault();
    profileName.textContent = nameField.value;
    profileHobby.textContent = hobbyField.value;
    closePopup(popupEditProfile);
})

addButton.addEventListener('click',function(){
    openPopup(popupAddCard);
});
closeButtonAdd.addEventListener('click',function(){
    closePopup(popupAddCard);
    formElementAdd.reset();
});

const formElementAdd=document.querySelector('.popup__form_add')
const nameMesto=formElementAdd.querySelector('.popup__field_type_name-mesto');
const imageAddress =formElementAdd.querySelector('.popup__field_type_image-address');

const handleElementSubmit = evt =>{
        evt.preventDefault();
        const link = imageAddress.value;
        const name = nameMesto.value;
        addElement(link,name);
        formElementAdd.reset();
        closePopup(popupAddCard);
    };

formElementAdd.addEventListener('submit',handleElementSubmit);



   // (evt) =>{
    //   openImage =document.querySelector('.popup__open-image');
    //   mestoName.textContent = openImage.querySelector('.popup__image-title').src;
    //   linkImage.src = openImage.querySelector('.popup__image').src;
    //   openPopup(openImage);
    //   console.log(evt)
    // });