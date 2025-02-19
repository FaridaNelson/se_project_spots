const initialCards = [
  {
    name: "New York Library",
    link: "https://unsplash.com/photos/a-black-and-white-photo-of-a-city-street-2LBEiScKJs0",
  },
  {
    name: "A Beach in the Phillipines",
    link: "https://unsplash.com/photos/aerial-view-of-beach-during-daytime-Ad7-qVkGy7Y",
  },
  {
    name: "A Landscape In Canada",
    link: "https://unsplash.com/photos/a-scenic-view-of-a-mountain-range-with-a-lake-in-the-foreground-j0qFdnSC_bY",
  },
  {
    name: "Pfeiffer Beach",
    link: "https://unsplash.com/photos/a-large-rock-formation-with-a-cave-in-the-middle-of-it-dlBxLYUTZQc",
  },
  {
    name: "Idyllic Alpine Waterscape",
    link: "https://unsplash.com/photos/a-small-town-on-a-lake-surrounded-by-mountains-SA5RjUtCSkI",
  },
  {
    name: "Oia sunset in Santorini, Greece",
    link: "https://unsplash.com/photos/a-view-of-a-white-village-on-a-cliff-TRyUyUfm_wU",
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
});
