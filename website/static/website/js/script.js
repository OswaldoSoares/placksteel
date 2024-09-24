$(document).ready(function () {
    // Função para exibir as imagens ciclicamente
    $('.image-carousel').each(function () {
        let images = $(this).find('img');
        let index = 0;
        $(images[index]).show();

        setInterval(() => {
            $(images[index]).fadeOut(500, function () {
                index = (index + 1) % images.length; // Atualiza o índice para a próxima imagem
                $(images[index]).fadeIn(500);
            });
        }, 3000); // Tempo de exibição de cada imagem
    });
});
