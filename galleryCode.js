import gallery from './gallery-items.js';

const createGallery = ({preview, original, description}) => {
    return `<li class="gallery-item">
      <a class= "gallery_link" href="${original}">
       <img
        class="gallery_image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        width="390"
        height="240"
        />
      </a>
    </li>`;
};

const makeMarkup = gallery.map(img => createGallery(img)).join('');

const galleryContainer = document.querySelector('.js-gallery');
galleryContainer.insertAdjacentHTML("afterbegin", makeMarkup);
