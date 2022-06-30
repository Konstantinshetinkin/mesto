const hideInputError = (formElement,inputElement,config) => {
    //прячем ошибку
    const {inputErrorClass,errorClass}=config
    const errorElement = (formElement.querySelector(`#${inputElement.id}-error`));
    inputElement.classList.remove(inputErrorClass)
    errorElement.classList.remove(errorClass)
    errorElement.textContent = '';

}

const showInputError = (formElement,inputElement,config) => {
    //добавляем ошибку
    const {inputErrorClass,errorClass}=config
    const errorElement = (formElement.querySelector(`#${inputElement.id}-error`));
    inputElement.classList.add(inputErrorClass)
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass)
}

const checkInputValidity = (formElement,inputElement,config) => {
//проверяем валидный ли инпут
if(inputElement.validity.valid){
    hideInputError(formElement,inputElement,config)
} else {
    showInputError(formElement,inputElement,config)
}
// //если валидный прячем ошибку  ,иначе показываем ошибку 
 }

const setEventListeners = (formElement, config) =>{
    const { inputSelector,submitButtonSelector, ...resConfig } = config;
    
formElement.addEventListener('submit', (evt)=>{
    evt.preventDefault();
})
//находим кнопку
const buttonElement = formElement.querySelector(submitButtonSelector); 

const hazInvalidInput  = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid) 
}

const toggleButtonState = (buttonElement,inputList) =>{
    //если форма валидная включаем кнопку
    if(hazInvalidInput(inputList)){
        buttonElement.disabled = true;
    } else{
        buttonElement.disabled = false ;
    }
}
//найти инпут
const  inputList  = Array.from(formElement.querySelectorAll(inputSelector))
inputList.forEach((inputElement) => {
inputElement.addEventListener('input', () =>  {
    //проверяем инпут на вилидность 
    checkInputValidity(formElement,inputElement,resConfig);
    toggleButtonState(buttonElement,inputList)
  })
})
}
const enableValidation = (config) =>{
    const { formSelector, ... resConfig } = config
//     //найти все формы на странице
    const formList = Array.from(document.querySelectorAll(formSelector)) 
//     //повесить слушатели на кнопки
    formList.forEach((formElement) =>{
        setEventListeners(formElement,resConfig)
    })
}