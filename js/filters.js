const RANDOM_PHOTOS_COUNT = 10;

import { addPictures } from './render-thumbnails.js';
import { debounce } from './util.js';

const filtersContainer = document.querySelector('.img-filters');
const defaultFilterBtn = document.getElementById('filter-default');
const randomFilterBtn = document.getElementById('filter-random');
const discussedFilterBtn = document.getElementById('filter-discussed');

let originalPhotos = [];

// Показывает фильтры
const showFilters = (photos) => {
  originalPhotos = photos;
  filtersContainer.classList.remove('img-filters--inactive');
};

// Условия сортировки
const renderFilteredPhotos = debounce(() => {
  let filteredPhotos = [...originalPhotos];
  const activeFilter = document.querySelector('.img-filters__button--active').id;

  switch (activeFilter) {
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
  document.querySelectorAll('.img-filters__button').forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });
  button.classList.add('img-filters__button--active');
  renderFilteredPhotos();
};

defaultFilterBtn.addEventListener('click', () => setActiveFilter(defaultFilterBtn));
randomFilterBtn.addEventListener('click', () => setActiveFilter(randomFilterBtn));
discussedFilterBtn.addEventListener('click', () => setActiveFilter(discussedFilterBtn));

export { showFilters };
