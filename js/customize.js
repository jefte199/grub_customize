'use strict';
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('imageUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const imagePreview = document.getElementById('imagePreview');
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block'; // Mostra a imagem após o carregamento

      // Criando o arquivo ZIP 
      const zip = new JSZip();
      const telaFolder = zip.folder("tela");
      telaFolder.file('background.jpg', e.target.result.split(',')[1], { base64: true });

      // Quando o arquivo ZIP for gerado, criar o link para download
      document.getElementById('downloadZip').style.display = 'block';
      document.getElementById('downloadZip').addEventListener('click', function () {
        zip.generateAsync({ type: "blob" }).then(function (content) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(content);
          link.download = 'BootArt.zip';
          link.click();
        });
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });
});

