import "./pages/index.css";
import "./scripts/validation.js";
import "./vendor/normalize.css";
import "./vendor/fonts.css";
import logo from "./images/logo.svg";
import avatar from "./images/avatar.jpg";
import {
  resetValidation,
  disableButton,
  settings,
} from "./scripts/validation.js";

document.querySelector(".header__logo").src = logo;
document.querySelector(".profile__avatar").src = avatar;

const initialCards = [
  {
    name: "New York Library",
    link: "https://images.unsplash.com/photo-1737923336697-621a80820522?q=80&w=2862&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "A Beach in the Phillipines",
    link: "https://images.unsplash.com/photo-1586768798120-95597acaa6e3?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "A Landscape In Canada",
    link: "https://images.unsplash.com/photo-1738936339590-ea1fc8bd9732?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Pfeiffer Beach",
    link: "https://images.unsplash.com/photo-1739057736231-3577bfc1a1b9?q=80&w=2825&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Idyllic Alpine Waterscape",
    link: "https://images.unsplash.com/photo-1738599778390-af77d7cf10e6?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Oia sunset in Santorini, Greece",
    link: "https://images.unsplash.com/photo-1569581464548-66d245ae5ca5?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  //Profile elements
  const profileEditButton = document.querySelector(".profile__edit-button");
  const profileAddButton = document.querySelector(".profile__add-button");
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

  const previewModal = document.querySelector("#preview-modal");
  const previewModalImage = previewModal.querySelector(".modal__image");
  const previewModalCaption = previewModal.querySelector(".modal__caption");

  //Card related elements
  const cardTemplate = document.querySelector("#card-template");
  const cardsList = document.querySelector(".cards__list");

  function getCardElement(data) {
    const cardElement = cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);

    const cardNameElement = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__image");
    const cardLikeButton = cardElement.querySelector(".card__like-button");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");

    cardNameElement.textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = `Image of ${data.name}`;

    cardLikeButton.addEventListener("click", () => {
      cardLikeButton.classList.toggle("card__like-button_liked");
    });

    cardImage.addEventListener("click", () => {
      openModal(previewModal);
      previewModalImage.src = data.link;
      previewModalCaption.textContent = data.name;
      previewModalImage.alt = `Image of ${data.name}`;
    });

    cardDeleteButton.addEventListener("click", () => {
      deleteCard(cardElement);
    });

    return cardElement;
  }

  function deleteCard(card) {
    card.remove();
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
    profileName.textContent = modalProfileName.value;
    profileDescription.textContent = modalProfileDescription.value;
    closeModal(editProfileModal);
  }

  function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const inputValues = {
      name: cardCaptionInput.value,
      link: cardLinkInput.value,
    };
    const cardElement = getCardElement(inputValues);
    cardsList.prepend(cardElement);

    cardFormElement.reset();
    disableButton(cardSubmitButton, settings);
    closeModal(cardModal);
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

  closeButtons.forEach((button) => {
    const popup = button.closest(".modal");
    button.addEventListener("click", () => closeModal(popup));
  });

  profileForm.addEventListener("submit", handleModalFormSubmit);
  cardFormElement.addEventListener("submit", handleCardFormSubmit);

  initialCards.forEach((card) => {
    const cardElement = getCardElement(card);
    cardsList.prepend(cardElement);
  });
});
