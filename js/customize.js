'use strict'
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('imageUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const imagePreview = document.getElementById('imagePreview');
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block'; // Mostra a imagem após o carregamento
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });
});
