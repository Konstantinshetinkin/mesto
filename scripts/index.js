//Переменные
const popup=document.querySelector('.popup');

const editButton=document.querySelector('.profile__edit-button');
const closeButton=document.querySelector('.popup__close-icon');

const profileName=document.querySelector('.profile__name');
const profileHobby=document.querySelector('.profile__hobby');

const nameField=document.querySelector('.popup__field_type_name');
const hobbyField=document.querySelector('.popup__field_type_hobby');

const formElement=document.querySelector('.popup__form')

//Функции 

function openPopup(popupElement){
    popupElement.classList.add('popup_opened')
    
};
function closePopup(popupElment){
    popupElment.classList.remove('popup_opened')
};


editButton.addEventListener('click',function(){
    openPopup(popup);
    nameField.value = profileName.textContent;
    hobbyField.value = profileHobby.textContent;
});
closeButton.addEventListener('click',function(){
    closePopup(popup);
});

formElement.addEventListener('submit',function(event){
    event.preventDefault();
    profileName.textContent = nameField.value;
    profileHobby.textContent = hobbyField.value;
    closePopup(popup);
})