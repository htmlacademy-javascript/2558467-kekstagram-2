import { addPictures } from './render-thumbnails.js';
import { debounce } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;

const filtersContainerElement = document.querySelector('.img-filters');
const defaultFilterBtnElement = document.getElementById('filter-default');
const randomFilterBtnElement = document.getElementById('filter-random');
const discussedFilterBtnElement = document.getElementById('filter-discussed');
const filerButtonElements = document.querySelectorAll('.img-filters__button');

let originalPhotos = [];
let activeFilterId = 'filter-default';

// Показывает фильтры
const showFilters = (photos) => {
  originalPhotos = photos;
  filtersContainerElement.classList.remove('img-filters--inactive');
};

// Условия сортировки
const renderFilteredPhotos = debounce(() => {
  let filteredPhotos = [...originalPhotos];

  switch (activeFilterId) {
    case 'filter-random':
      filteredPhotos = filteredPhotos.sort(() => Math.random() - 0.5)
        .slice(0, RANDOM_PHOTOS_COUNT);
      break;

    case 'filter-discussed':
      filteredPhotos = filteredPhotos.sort((a, b) => b.comments.length - a.comments.length);
      break;

    default:
      break;
  }

  document.querySelectorAll('.picture').forEach((element) => element.remove());
  addPictures(filteredPhotos);
}, 500);

// Активирует фильтр
const setActiveFilter = (button) => {
  if (button.classList.contains('img-filters__button--active')) {
    return;
  }

  filerButtonElements.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });

  button.classList.add('img-filters__button--active');
  activeFilterId = button.id;
  renderFilteredPhotos();
};

defaultFilterBtnElement.addEventListener('click', () => setActiveFilter(defaultFilterBtnElement));
randomFilterBtnElement.addEventListener('click', () => setActiveFilter(randomFilterBtnElement));
discussedFilterBtnElement.addEventListener('click', () => setActiveFilter(discussedFilterBtnElement));

export { showFilters };
