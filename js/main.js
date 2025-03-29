import { addPictures } from './render-thumbnails.js';
import './upload-form.js';
import { initScale } from './scale.js';
import { initEffects } from './effect.js';
import { getData } from './fetch-data.js';
import { showFilters } from './filters.js';

initScale();
initEffects();

getData().then((photos) => {
  if (photos) {
    addPictures(photos);
    showFilters(photos);
  }
});
