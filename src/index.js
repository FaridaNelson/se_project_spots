import "./pages/index.css";
import "./scripts/validation.js";
import "./vendor/normalize.css";
import "./vendor/fonts.css";
import logo from "./images/logo.svg";
import avatar from "./images/avatar.jpg";
import pencilIcon from "./images/pensil-wht.svg";
import {
  resetValidation,
  disableButton,
  settings,
} from "./scripts/validation.js";
import Api from "./utils/Api.js";

document.querySelector(".header__logo").src = logo;
document.querySelector(".profile__avatar").src = avatar;
document.querySelector(".profile__pencil-icon").src = pencilIcon;

// const initialCards = [
//   {
//     name: "New York Library",
//     link: "https://images.unsplash.com/photo-1737923336697-621a80820522?q=80&w=2862&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "A Beach in the Phillipines",
//     link: "https://images.unsplash.com/photo-1586768798120-95597acaa6e3?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "A Landscape In Canada",
//     link: "https://images.unsplash.com/photo-1738936339590-ea1fc8bd9732?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Pfeiffer Beach",
//     link: "https://images.unsplash.com/photo-1739057736231-3577bfc1a1b9?q=80&w=2825&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Idyllic Alpine Waterscape",
//     link: "https://images.unsplash.com/photo-1738599778390-af77d7cf10e6?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Oia sunset in Santorini, Greece",
//     link: "https://images.unsplash.com/photo-1569581464548-66d245ae5ca5?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3afa45a9-62de-49c7-b3d5-fa0d981aed53",
    "Content-Type": "application/json",
  },
});

document.addEventListener("DOMContentLoaded", function () {
  //Profile elements
  const profileEditButton = document.querySelector(".profile__edit-button");
  const profileAddButton = document.querySelector(".profile__add-button");
  const avatarModalButton = document.querySelector(".profile__avatar-btn");
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  //Form elements
  const editProfileModal = document.querySelector("#edit-profile-modal");
  const profileForm = editProfileModal.querySelector(".modal__form");

  // Find all close buttons
  const closeButtons = document.querySelectorAll(".modal__close-button");

  const modalProfileName = editProfileModal.querySelector(
    "#profile-name-input"
  );
  const modalProfileDescription = editProfileModal.querySelector(
    "#profile-description-input"
  );

  const cardModal = document.querySelector("#add-card-modal");
  const cardFormElement = cardModal.querySelector(".modal__form");
  const cardSubmitButton = cardModal.querySelector(".modal__submit-button");
  const cardLinkInput = cardModal.querySelector("#add-card-link-input");
  const cardCaptionInput = cardModal.querySelector("#add-card-caption-input");
  const cardLikeButton = document.querySelector(".card__like-button");

  const previewModal = document.querySelector("#preview-modal");
  const previewModalImage = previewModal.querySelector(".modal__image");
  const previewModalCaption = previewModal.querySelector(".modal__caption");

  //Avatar modal elements
  const avatarModal = document.querySelector("#avatar-modal");
  const avatarFormElement = avatarModal.querySelector(".modal__form");
  const avatarSubmitButton = avatarModal.querySelector(".modal__submit-button");
  const avatarLinkInput = avatarModal.querySelector("#profile-avatar-input");

  //Delete modal elements
  const deleteModal = document.querySelector("#delete-modal");
  const deleteForm = deleteModal.querySelector(".modal__form");

  const cancelButton = deleteModal?.querySelector(".modal__cancel-button");
  if (cancelButton) {
    cancelButton.addEventListener("click", () => closeModal(deleteModal));
  }

  //Card related elements
  const cardTemplate = document.querySelector("#card-template");
  const cardsList = document.querySelector(".cards__list");

  let selectedCard;
  let selectedCardId;

  api
    .getAppInfo()
    .then(([cards, userInfo]) => {
      api.userId = userInfo._id;

      profileName.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;

      document.querySelector(".profile__avatar").src = userInfo.avatar;
      cards.reverse().forEach((card) => {
        const cardElement = getCardElement(card);
        cardsList.prepend(cardElement);
      });
    })
    .catch((err) => {
      console.error(err);
    });

  function handleLike(evt, id) {
    const cardLikeButton = evt.currentTarget;
    const isLiked = cardLikeButton.classList.contains(
      "card__like-button_liked"
    );
    api
      .changeLikeStatus(id, isLiked)
      .then((updatedCard) => {
        console.log("API response:", updatedCard);

        if (updatedCard.isLiked === true) {
          cardLikeButton.classList.add("card__like-button_liked");
        } else {
          cardLikeButton.classList.remove("card__like-button_liked");
        }
        console.log("Button class list:", cardLikeButton.classList);
      })
      .catch((err) => {
        console.error("Error toggling like status:", err);
      });
    console.log(isLiked);
  }

  function getCardElement(data) {
    const cardElement = cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);

    const cardNameElement = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__image");
    const cardLikeButton = cardElement.querySelector(".card__like-button");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");

    if (data.isLiked === true) {
      cardLikeButton.classList.add("card__like-button_liked");
    }

    cardNameElement.textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = `Image of ${data.name}`;

    cardLikeButton.addEventListener("click", (evt) =>
      handleLike(evt, data._id)
    );

    cardImage.addEventListener("click", () => {
      openModal(previewModal);
      previewModalImage.src = data.link;
      previewModalCaption.textContent = data.name;
      previewModalImage.alt = `Image of ${data.name}`;
    });

    cardDeleteButton.addEventListener("click", () => {
      handleDeleteCard(cardElement, data._id);
    });

    return cardElement;
  }

  function openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", closeOnEscape);
    modal.addEventListener("click", closeOnOverlayClick);
  }

  function closeModal(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", closeOnEscape);
    modal.removeEventListener("click", closeOnOverlayClick);
    document.activeElement.blur();
  }

  function closeOnOverlayClick(event) {
    if (event.target.classList.contains("modal")) {
      closeModal(event.target);
    }
  }
  function closeOnEscape(event) {
    if (event.key === "Escape") {
      const openedModal = document.querySelector(".modal_opened");
      if (openedModal) {
        closeModal(openedModal);
      }
    }
  }

  function handleModalFormSubmit(evt) {
    evt.preventDefault();
    api
      .editUserInfo({
        name: modalProfileName.value,
        about: modalProfileDescription.value,
      })
      .then((data) => {
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
        closeModal(editProfileModal);
      })
      .catch(console.error);
  }

  function handleDeleteCard(cardElement, cardId) {
    selectedCard = cardElement;
    selectedCardId = cardId;
    openModal(deleteModal);
  }

  function handleDeleteSubmit(evt) {
    evt.preventDefault();
    api
      .deleteCard(selectedCardId)
      .then(() => {
        selectedCard.remove();
        closeModal(deleteModal);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const name = cardCaptionInput.value;
    const link = cardLinkInput.value;

    api
      .addNewCard({ name, link })
      .then((cardData) => {
        if (cardData.isLiked === undefined) {
          cardData.isLiked = false;
        }
        const newCardElement = getCardElement(cardData);
        cardsList.prepend(newCardElement);

        cardFormElement.reset();
        disableButton(cardSubmitButton, settings);
        closeModal(cardModal);
      })
      .catch((err) => {
        console.error("Error adding new card;", err);
      });
  }

  function handleAvatarSubmit(evt) {
    evt.preventDefault();
    const avatar = avatarLinkInput.value;
    api
      .editAvatarInfo(avatar)
      .then((data) => {
        document.querySelector(".profile__avatar").src = data.avatar;
        closeModal(avatarModal);
      })
      .catch(console.error);
  }

  profileEditButton.addEventListener("click", () => {
    modalProfileName.value = profileName.textContent;
    modalProfileDescription.value = profileDescription.textContent;
    resetValidation(
      editProfileModal,
      [modalProfileName, modalProfileDescription],
      settings
    );
    openModal(editProfileModal);
  });

  profileAddButton.addEventListener("click", () => {
    openModal(cardModal);
  });

  avatarModalButton.addEventListener("click", () => {
    openModal(avatarModal);
  });
  avatarFormElement.addEventListener("submit", handleAvatarSubmit);

  closeButtons.forEach((button) => {
    const popup = button.closest(".modal");
    button.addEventListener("click", () => closeModal(popup));
  });

  profileForm.addEventListener("submit", handleModalFormSubmit);
  cardFormElement.addEventListener("submit", handleCardFormSubmit);

  deleteForm.addEventListener("submit", handleDeleteSubmit);
});
