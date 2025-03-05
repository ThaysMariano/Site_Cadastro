const images = [...document.querySelectorAll('.imagem')];
const descricoes = ["Comande seu próprio culto e lidere seguidores em um mundo sombrio e carismático", "Supere desafios emocionantes e descubra a emocionante jornada de autodescoberta de Madeline", "Uma experiência visual e emocional única sobre superação e crescimento", "Um jogo de plataforma desafiador com visuais inspirados em animações clássicas dos anos 30", "Um RPG inovador onde suas escolhas afetam profundamente a história e os personagens", "Explore, construa e lute em um mundo pixelado cheio de aventuras e mistérios"]
const nomes = ["Cult of the lamb", "Celeste", "Gris", "CupHead", "Undertale", "Terraria"];
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.btn-fechar');
const imageName = document.querySelector('.nome-imagem');
const largeImage = document.querySelector('.imagem-grande');
const imageIndex = document.querySelector('.index');
const leftArrow = document.querySelector('.flecha-esquerda');
const rightArrow = document.querySelector('.flecha-direita');
const descricao = document.querySelector('.descricao');


let index = 0;

images.forEach((item, i) => {
    item.addEventListener('click', () => {
        updateImage(i);
        popup.classList.toggle('active');
    })
})

const updateImage = (i) => {
    let path = `/imgs/galeria/img${i + 1}.png`;
    largeImage.src = path;
    imageName.innerHTML = nomes[i];
    imageIndex.innerHTML = `0${i + 1}`;
    descricao.innerHTML = descricoes[i];
    index = i;
}

closeBtn.addEventListener('click', () => {
    popup.classList.toggle('active');
})

leftArrow.addEventListener('click', () => {
    if (index > 0) {
        updateImage(index - 1);
    } else if (index == 0) {
        updateImage(images.length - 1);
    }
})

rightArrow.addEventListener('click', () => {
    if (index < images.length - 1) {
        updateImage(index + 1);
    } else if (index = images.length) {
        updateImage(0);
    }
})
