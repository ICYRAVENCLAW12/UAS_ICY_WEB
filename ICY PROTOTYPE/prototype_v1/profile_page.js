const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal-followers.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal-following.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal-friends_online.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal-followers");
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal-following");
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal-friends_online");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}


// Changing Image
const imgDiv = document.querySelector('.profile_img')
const img = document.querySelector('#photo')
const file = document.querySelector('#file')
const uploadBtn = document.querySelector('#uploadBtn')

// if user hover on image
imgDiv.addEventListener('mouseenter', function() {
  uploadBtn.style.display = "block"
});

// if user hover out of image
imgDiv.addEventListener('mouseleave', function() {
  uploadBtn.style.display = "none"
});

file.addEventListener('change', function() {
  const choosedFile = this.files[0];

  if (choosedFile) {

    const reader = new FileReader();

    reader.addEventListener('load', function() {
      img.setAttribute('src', reader.result);
    });

    reader.readAsDataURL(choosedFile);
  }
});

/* To change icon when clicked */
function changeIcons(icon) {
  icon.classList.toggle("fa-user-times");
}

/* Loading */
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
});
