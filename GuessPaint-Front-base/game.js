const backButton = document.getElementById("backBtn");
const joinButton = document.getElementById("joinBtn");
const createButton = document.getElementById("createBtn");

// Botón back
backButton.addEventListener("click", function() {
    window.history.back();
});

joinButton.addEventListener("click", function() {
    window.location.href = "/join.html";
});

createButton.addEventListener("click", function() {
    window.location.href = "/create.html";
});