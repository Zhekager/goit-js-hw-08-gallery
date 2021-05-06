
import imageCollection from './gallery-items.js';


const refs = {
  galleryList: document.querySelector('.js-gallery'),
  previewContainer: document.querySelector('.js-lightbox'),
  previewContainerOverlay: document.querySelector(
    '.js-lightbox .lightbox__overlay',
  ),
  modalImage: document.querySelector('.js-lightbox .lightbox__image'),
  modalCloseButton: document.querySelector('[data-action="close-lightbox"]'),
};

const originalLinks = imageCollection.map(elem => {
  return elem.original;
});

let indexOfOriginalLink = 0;

const generateGallery = imageCollection
  .map(el => {
    return `<li class = "gallery__item">
    <a class="gallery__link" href="${el.original}">
       <image class = "gallery__image" 
          src = "${el.preview}" 
          data-source="${el.original}" 
          alt = "${el.description}">
       </a>
     </li>`;
  }).join('');
  

  const modalOpen = evt => {
    if (!evt.target.classList.contains('gallery__image')) {
      return;
    }
    refs.previewContainer.classList.add('is-open');
    const targetSource = evt.target.dataset.source;
    refs.modalImage.src = targetSource;
    refs.modalImage.alt = evt.target.alt;
    indexOfOriginalLink = originalLinks.indexOf(targetSource);
  };
  
  const resetAttribute = () => {
    refs.modalImage.src = '';
    refs.modalImage.alt = '';
  };
  
  const closeModal = () => {
    refs.previewContainer.classList.remove('is-open');
    resetAttribute();
  };
  
  const closeModalByEscKey = evt => {
    if (!refs.previewContainer.classList.contains('is-open')) {
      return;
    }
     if (evt.code === 'Escape') {
      refs.previewContainer.classList.remove('is-open');
      resetAttribute();
    }
  };
  const moveToLeft = evt => {
    if (evt.code === 'ArrowLeft') {
      indexOfOriginalLink > 0
        ? (refs.modalImage.src = originalLinks[(indexOfOriginalLink -= 1)])
        : (refs.modalImage.src =
            originalLinks[(indexOfOriginalLink = originalLinks.length - 1)]);
    }
  };
  
  const moveToRight = evt => {
    if (evt.code === 'ArrowRight') {
      indexOfOriginalLink < originalLinks.length - 1
        ? (refs.modalImage.src = originalLinks[(indexOfOriginalLink += 1)])
        : (refs.modalImage.src = originalLinks[(indexOfOriginalLink = 0)]);
    }
  };
  
  const arrowNavigation = evt => {
    if (!refs.previewContainer.classList.contains('is-open')) {
      return;
    }
    moveToLeft(evt);
    moveToRight(evt);
  };
  
  refs.galleryList.insertAdjacentHTML('beforeend', generateGallery);
  refs.galleryList.addEventListener('click', evt => {
    evt.preventDefault();
    modalOpen(evt);
  });
  refs.modalCloseButton.addEventListener('click', closeModal);
  refs.previewContainerOverlay.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModalByEscKey);
  window.addEventListener('keydown', arrowNavigation);  