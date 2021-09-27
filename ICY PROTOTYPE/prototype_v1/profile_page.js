// Open and Close modal
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
  const modals = document.querySelectorAll(".modal-information.active");
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
    const modal = button.closest(".modal-information");
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


imgDiv.addEventListener('mouseenter', function() {
  uploadBtn.style.display = "block"
});

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

// Loading 
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
});

// To change icon when clicked 
function changeIcons(icon) {
  icon.classList.toggle("fa-user-times");
}

// Stop body scroll 
$.fn.isolatedScroll = function() {
  this.bind('mousewheel DOMMouseScroll', function (e) {
      var delta = e.wheelDelta || (e.originalEvent && e.originalEvent.wheelDelta) || -e.detail,
          bottomOverflow = this.scrollTop + $(this).outerHeight() - this.scrollHeight >= 0,
          topOverflow = this.scrollTop <= 0;

      if ((delta < 0 && bottomOverflow) || (delta > 0 && topOverflow)) {
          e.preventDefault();
      }
  });
  return this;
};

$('.grid-mid').isolatedScroll();
$('.modal-body-following').isolatedScroll();
$('.modal-body-followers').isolatedScroll();
