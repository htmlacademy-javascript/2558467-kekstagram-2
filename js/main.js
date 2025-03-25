import { addPictures } from './render-thumbnails.js';
import './upload-form.js';
import { initScale } from './scale.js';
import { initEffects } from './effect.js';
import { getData } from './fetch-data.js';

initScale();
initEffects();

getData().then((photos) => {
  if (photos) {
    addPictures(photos);
  }
});
