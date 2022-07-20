class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _toggleButtonState(buttonElement, inputList) {
    if (this._hazInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    }
  }
  _hazInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };
  _disableButton(buttonElement) {
    buttonElement.disabled = true;
  }
  _enableButton(buttonElement) {
    buttonElement.disabled = false;
  }
  _checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(formElement, inputElement);
    } else {
      this._showInputError(formElement, inputElement);
    }
  }
  _setEventListeners() {
    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._formElement, inputElement);
        this._toggleButtonState(buttonElement, inputList);
      });
    });
  }

  resetForm(){
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector))
    inputList.forEach((inputElement) => {
    this._hideInputError(this._formElement,inputElement)
  })
    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector);
    this._toggleButtonState(buttonElement, inputList);
  
}

  enableValidation() {
    this._setEventListeners(this._formElement);
  }
}

export { FormValidator };
