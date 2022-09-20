
class Card {
  constructor(item,userId,templateSelector, handleCardClick,handleDeleteClick,handleLikeClick) {
    this._id = item._id;
    this._link = item.link;
    this._name = item.name;
    this._likes = item.likes;
    this._userId = userId;
    this._ownerId = item.owner._id;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  isLiked(){
    const userHasLikeCard =this._likes.find(like => like._id === this._userId )
    return userHasLikeCard
  }

  setLikes(newLikes){
   this._likes =  newLikes
    const likeScore = this._element.querySelector(".element__like-score");
    likeScore.textContent = this._likes.length

    if(this.isLiked()){
      this._addLike()
    }else{
      this._deleteLike()
    }
  }
  _addLike() {
    this._likeButton.classList.add("element__like_active");
  }
  _deleteLike() {
    this._likeButton.classList.remove("element__like_active");
  }



  creatCard() {
    this._element = this._getTemplate();
 
    this._cardImage = this._element.querySelector(".element__foto");
    this._likeButton = this._element.querySelector(".element__like");
    this.setLikes(this._likes);
  
    this._setEventListener();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    if(this._userId !== this._ownerId){
      this._element.querySelector(".element__trash").classList.add("element__trash_active")
    }

    return this._element;
  }
  _setEventListener() {
    this._likeButton.addEventListener("click",() =>
      this._handleLikeClick(this._id)
    );
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        this._handleDeleteClick(this._id);
      });
    this._cardImage.addEventListener("click", () => {
      const card = { name: this._name, link: this._link };
      this._handleCardClick(card);
    });
  }

  deleteCard() {
      this._element.remove();
      this._element = null;
  }
}

export { Card };
