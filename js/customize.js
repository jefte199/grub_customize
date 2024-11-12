document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('imageUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const imagePreview = document.getElementById('imagePreview');
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block';

      // Criando o arquivo ZIP com a pasta 'tela' e a pasta 'icons'
      const zip = new JSZip();
      const telaFolder = zip.folder("Tela");
      const iconFolder = zip.folder("Tela/icons");

      // Adicionando a imagem carregada pelo usuário
      telaFolder.file('background.jpg', e.target.result.split(',')[1], { base64: true });

      // Lista de arquivos a serem adicionados na pasta raiz
      const filesToAdd = ['theme.txt', 'install.sh'];
      const fetchPromises = filesToAdd.map(filename =>
        fetch(`../tela_grub/${filename}`)
          .then(response => response.blob())
          .then(blob => new Promise(resolve => {
            const fileReader = new FileReader();
            fileReader.onload = function (fileEvent) {
              zip.file(filename, fileEvent.target.result.split(',')[1], { base64: true });
              resolve();
            };
            fileReader.readAsDataURL(blob);
          }))
      );

      // Lista de arquivos a serem adicionados na pasta ./Tela
      const filesTela = [
        'dejavu_32.pf2'
        , 'dejavu_sans_12.pf2'
        , 'dejavu_sans_14.pf2'
        , 'dejavu_sans_14.pf2dejavu_sans_14.pf2'
        , 'dejavu_sans_24.pf2'
        , 'dejavu_sans_48.pf2'
        , 'terminus-12.pf2'
        , 'terminus-14.pf2'
        , 'terminus-16.pf2'
        , 'terminus-18.pf2'
        , 'select_c.png'
        , 'select_e.png'
        , 'select_w.png'
        , 'terminal_box_c.png'
        , 'terminal_box_e.png'
        , 'terminal_box_n.png'
        , 'terminal_box_ne.png'
        , 'terminal_box_nw.png'
        , 'terminal_box_s.png'
        , 'terminal_box_se.png'
        , 'terminal_box_sw.png'
        , 'terminal_box_w.png'
        , 'theme.txt'];
      const featchTelaPromises = filesTela.map(filename =>
        fetch(`../tela_grub/${filename}`)
          .then(response => response.blob())
          .then(blob => new Promise(resolve => {
            const fileReader = new FileReader();
            fileReader.onload = function (fileEvent) {
              telaFolder.file(filename, fileEvent.target.result.split(',')[1], { base64: true });
              resolve();
            };
            fileReader.readAsDataURL(blob);
          }))
      );

      // Lista de arquivos a serem adicionados na pasta ./Tela/icons
      const filesIcon = [
        'antergos.png'
        , 'archlinux.png'
        , 'arch.png'
        , 'cancel.png'
        , 'chakra.png'
        , 'debian.png'
        , 'deepin.png'
        , 'driver.png'
        , 'edit.png'
        , 'efi.png'
        , 'elementary.png'
        , 'endeavouros.png'
        , 'fedora.png'
        , 'find.efi.png'
        , 'find.none.png'
        , 'gentoo.png'
        , 'gnu-linux.png'
        , 'help.png'
        , 'kbd.png'
        , 'korora.png'
        , 'kubuntu.png'
        , 'lang.png'
        , 'lfs.png'
        , 'linuxmint.png'
        , 'linux.png'
        , 'lubuntu.png'
        , 'macosx.png'
        , 'mageia.png'
        , 'manjaro.i686.png'
        , 'manjaro.png'
        , 'manjaro.x86_64.png'
        , 'memtest.png'
        , 'opensuse.png'
        , 'recovery.png'
        , 'restart.png'
        , 'shutdown.png'
        , 'siduction.png'
        , 'solus.png'
        , 'steamos.png'
        , 'type.png'
        , 'tz.png'
        , 'ubuntu.png'
        , 'unknown.png'
        , 'unset.png'
        , 'void.png'
        , 'windows.png'
        , 'xubuntu.png'
      ];
      const fetchIconsPromises = filesIcon.map(filename =>
        fetch(`../tela_grub/${filename}`)
          .then(response => response.blob())
          .then(blob => new Promise(resolve => {
            const fileReader = new FileReader();
            fileReader.onload = function (fileEvent) {
              iconFolder.file(filename, fileEvent.target.result.split(',')[1], { base64: true });
              resolve();
            };
            fileReader.readAsDataURL(blob);
          }))
      );

      // Adicionando todos os arquivos após carregamento
      Promise.all(fetchPromises, featchTelaPromises, fetchIconsPromises).then(() => {
        document.getElementById('downloadZip').style.display = 'block';
        document.getElementById('downloadZip').addEventListener('click', function () {
          zip.generateAsync({ type: "blob" }).then(function (content) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = 'BootArt.zip';
            link.click();
          });
        });
      }).catch(error => console.error("Erro ao carregar arquivos:", error));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });
});
