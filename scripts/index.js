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
  const profileEditButton = document.querySelector(".profile__edit-button");
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  const editProfileModal = document.querySelector("#edit-profile-modal");
  const modalFormElement = editProfileModal.querySelector(".modal__form");
  const modalCloseButton = editProfileModal.querySelector(
    ".modal__close-button"
  );
  const modalProfileName = editProfileModal.querySelector(
    "#profile-name-input"
  );
  const modalProfileDescription = editProfileModal.querySelector(
    "#profile-description-input"
  );

  const cardTemplate = document.querySelector("#card-template");
  const cardsList = document.querySelector(".cards__list");

  function getCardElement(data) {
    const cardElement = cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);

    const cardNameElement = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__image");

    cardNameElement.textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = `Image of ${data.name}`;

    return cardElement;
  }

  function openModal() {
    modalProfileName.value = profileName.textContent;
    modalProfileDescription.value = profileDescription.textContent;
    editProfileModal.classList.add("modal_opened");
  }

  function closeModal() {
    editProfileModal.classList.remove("modal_opened");
  }

  function handleModalFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = modalProfileName.value;
    profileDescription.textContent = modalProfileDescription.value;
    closeModal();
  }

  profileEditButton.addEventListener("click", openModal);
  modalCloseButton.addEventListener("click", closeModal);
  modalFormElement.addEventListener("submit", handleModalFormSubmit);

  for (let i = 0; i < initialCards.length; i++) {
    const cardElement = getCardElement(initialCards[i]);
    cardsList.prepend(cardElement);
  }
});
