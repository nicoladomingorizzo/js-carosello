/* creare un'array di oggetti con :
-imaggine
-titolo
-descrizione
*/

const images = [
    {
        image: 'Expedition_33.avif',
        title: 'Expedition 33',
        description: 'lorem game 333'
    },
    {
        image: 'Lies-of-P-Overture-Key-Art-Wide.jpg',
        title: 'Lies of P',
        description: 'lorem game P'
    },
    {
        image: 'sekiro-shadows-die-twice-review.webp',
        title: 'Sekiro',
        description: 'lorem game Sekiro'
    },
    {
        image: 'Star Wars Jedi.avif',
        title: 'Starwars',
        description: 'lorem game Starwars'
    },
    {
        image: 'street fighters.jpeg',
        title: 'Street fighters',
        description: 'lorem game Street fighters'
    }
];

// prendiamo gli elementi della dom: -backward -forward -image -thumbnails
const backwardEl = document.querySelector('.backward');
const forwardEl = document.querySelector('.forward');
const imageEl = document.querySelector('.image');
const thumbnailsEl = document.querySelector('.thumbnails');
const carouselEl = document.querySelector('.carosello');
let activeImage = 0; //selezioniamo l'immagine attiva

// renderizzare la prima immagine

renderPreviewImage(activeImage, images, imageEl)

//aggiungere addEventListener per backward
backwardEl.addEventListener('click', back)

//aggiungere addEventListener per forward

forwardEl.addEventListener('click', next);

// thumbnails

//loop l'array delle images

for (let i = 0; i < images.length; i++) {
    //prendere l'immagine dal ciclo
    const thumbnail = images[i];
    // destructuring di images e prendiamo image e title
    const { image, title } = thumbnail;
    //generiamo il markup con la DOM API
    //creare un div
    const divEl = document.createElement('div');
    //aggiungi una classe
    divEl.classList.add('col');
    //creare un elemento image
    const imgEl = document.createElement('img');
    // aggiungi img-fluid
    imgEl.classList.add('img-fluid');
    imgEl.style.objectFit = 'cover;'
    imgEl.style.aspectRatio = '16/9';
    //aggiungere l'src
    imgEl.src = `./assets/img/${image}`;
    //aggiungere l'alt
    imgEl.alt = title;
    imgEl.setAttribute('data-thumb-id', i);// creo un attributo id (data custom attribute)
    // appendchild
    divEl.appendChild(imgEl);
    // generare un addEventListener
    imgEl.addEventListener('click', () => {
        const thumbId = Number(imgEl.getAttribute('data-thumb-id'));
        activeImage = thumbId;
        renderPreviewImage(activeImage, images, imageEl);
    });
    // inserire in pagina nell'elemento della dom prestabilito
    thumbnailsEl.appendChild(divEl);
};

//setinterval per scorrimento foto automatico
let intervalId = setInterval(next, 2000);

//clear setinterval per stoppare l'immagine quando il mouse passa sopra
carouselEl.addEventListener('mouseenter', () => {
    console.log('entered')
    clearInterval(intervalId);
});
//set interval quando il mouse si sposta dall'immagine
carouselEl.addEventListener('mouseleave', () => {
    console.log('leave')
    intervalId = setInterval(next, 2000);
});

// Funzioni
function renderPreviewImage(index, arr, nodeEl) {
    nodeEl.innerHTML = `<img class="img-fluid h-100 object-fit-cover ratio ratio-16-9" src="./assets/img/${arr[index].image}" alt="${arr[index].title}">`
};

function next() {
    console.log('autoplay');
    activeImage++;
    if (activeImage === images.length) {
        activeImage = 0;
    }
    renderPreviewImage(activeImage, images, imageEl);
};

function back() {
    activeImage--;
    if (activeImage < 0) {
        activeImage = images.length - 1;
    }
    renderPreviewImage(activeImage, images, imageEl);
};