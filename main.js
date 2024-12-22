/// Selectors
const errorModal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const hearts = document.querySelectorAll(".like-glyph");

// Constants
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Event Listener for each heart
hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    if (heart.textContent === EMPTY_HEART) {
      // Handle "like" action
      mimicServerCall()
        .then(() => {
          heart.textContent = FULL_HEART;
          heart.classList.add("activated-heart");
        })
        .catch((error) => {
          // Display error modal
          modalMessage.textContent = error;
          errorModal.classList.remove("hidden");

          // Hide the modal after 3 seconds
          setTimeout(() => {
            errorModal.classList.add("hidden");
          }, 3000);
        });
    } else {
      // Handle "unlike" action
      heart.textContent = EMPTY_HEART;
      heart.classList.remove("activated-heart");
    }
  });
});

// Mock server function provided
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Randomly resolve or reject to simulate server behavior
      if (Math.random() < 0.8) {
        resolve("Pretend remote server notified of action!");
      } else {
        reject("Random server error. Try again.");
      }
    }, 300);
  });
}

