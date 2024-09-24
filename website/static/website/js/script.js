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

    let container = $('.works-container');
    let cardWidth = $('.work-card').outerWidth(true); // Largura do card com margens
    let gap = 20;
    let rotationInterval;
    let isAnimating = false; // Flag para evitar múltiplos cliques

    // Ajuste o número de cards visíveis com base na largura do container e gap
    function calculateVisibleCards() {
        let containerWidth = $('.carousel-container').width();
        return Math.floor(containerWidth / (cardWidth + gap));
    }

    // Ajusta o contêiner de acordo com o número de cards visíveis
    function adjustCarousel() {
        let visibleCards = calculateVisibleCards();
        let containerWidth = visibleCards * (cardWidth + gap) - gap; // Calcula a largura necessária
        $('.carousel-container').css({
            'width': containerWidth + 'px',
            'margin': '0 auto' // Centraliza o carrossel na tela
        });
    }


    // Função para mover os cards continuamente
    function rotateCarousel() {
        if (!isAnimating) {
            isAnimating = true;
            container.animate({ 'margin-left': - (cardWidth + gap) }, 1000, function () {
                $(this).find('.work-card:first').appendTo(container);
                $(this).css('margin-left', 0); // Reseta a margem para continuar o loop
                isAnimating = false;
            });
        }
    }

    // Inicia a rotação contínua a cada 4 segundos
    function startRotation() {
        rotationInterval = setInterval(rotateCarousel, 4000);
    }

    startRotation(); // Inicia a rotação

    // Função para lidar com a animação e rotação
    function handleRotation(direction) {
        if (isAnimating) return; // Se estiver animando, não faça nada
        clearInterval(rotationInterval); // Para a rotação automática
        isAnimating = true; // Marca que a animação está acontecendo
        
        let animationPromise;

        if (direction === 'next') {
            animationPromise = container.animate({ 'margin-left': - (cardWidth + gap) }, 1000).promise();
            animationPromise.then(function () {
                $(container).find('.work-card:first').appendTo(container);
                $(container).css('margin-left', 0); // Reseta a margem para continuar o loop
                isAnimating = false; // Marca que a animação terminou
                startRotation(); // Reinicia a rotação automática
            });
        } else if (direction === 'prev') {
            // Move o último card para o início
            $(container).find('.work-card:last').prependTo(container);
            $(container).css('margin-left', -(cardWidth + gap));
            animationPromise = container.animate({ 'margin-left': 0 }, 1000).promise();
            animationPromise.then(function () {
                isAnimating = false; // Marca que a animação terminou
                startRotation(); // Reinicia a rotação automática
            });
        }
    }

    // Evento para o botão "Próximo"
    $('#scroll-next').click(function () {
        handleRotation('next');
    });

    // Evento para o botão "Anterior"
    $('#scroll-prev').click(function () {
        handleRotation('prev');
    });

    // Recalcula e ajusta o carrossel ao redimensionar a tela
    $(window).resize(function () {
        adjustCarousel(); // Reajusta o tamanho do contêiner
    });

    adjustCarousel(); // Ajuste inicial
});
