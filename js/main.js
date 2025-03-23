import { createPhotoArray } from './data.js';
import { addPictures } from './render-thumbnails.js';
import './upload-form.js';
import { initScale } from './scale.js';
import { initEffects } from './effect.js';

addPictures(createPhotoArray());
initScale();
initEffects();
