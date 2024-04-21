document.addEventListener('DOMContentLoaded', function() {
  // Tu código JavaScript aquí
  const avatarButton = document.getElementById('avatarButton');
  const modal = document.getElementById('avatarModal');
  const closeButton = document.querySelector('.close');
  const avatars = document.querySelectorAll('#avatars img');
  const avatar0 = document.querySelector('#avatar0');
  const privButton = document.getElementById("privateBtn");

  // Función para mostrar el modal al hacer clic en el botón
  avatarButton.addEventListener('click', function() {
      modal.style.display = 'block';
  });

  // Función para ocultar el modal al hacer clic en la 'x' o fuera de él
  closeButton.addEventListener('click', closeModal);
  window.addEventListener('click', function(event) {
      if (event.target == modal) {
          closeModal();
      }
  });

  // Función para seleccionar un avatar
  avatars.forEach(function(avatar) {
      avatar.addEventListener('click', function() {
          const avatarSrc = this.getAttribute('src');
          avatar0.setAttribute('src', avatarSrc);
          closeModal();
      });
  });

  // Función para cerrar el modal
  function closeModal() {
      modal.style.display = 'none';
  }

  // Botón back
  privButton.addEventListener("click", function() {
    window.location.href = "/game.html";
});
});
