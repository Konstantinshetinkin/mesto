//Переменные
const popup=document.querySelector('.popup');

const editButton=document.querySelector('.profile__edit-button');
const closeButton=document.querySelector('.popup__close-icon');
const submitButton=document.querySelector('.popup__submit-button');

const profileName=document.querySelector('.profile__name');
const profileHobby=document.querySelector('.profile__hobby');

const nameField=document.querySelector('.popup__field_1');
const hobbyField=document.querySelector('.popup__field_2');

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

submitButton.addEventListener('click',function(event){
    event.preventDefault();
    profileName.textContent = nameField.value;
    profileHobby.textContent = hobbyField.value;
    closePopup(popup);
})