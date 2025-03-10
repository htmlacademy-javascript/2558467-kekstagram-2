import { createProfilesArray } from './data.js';
import { addPictures } from './renders-thumbnails.js';

const arrayProfiles = createProfilesArray;
const rendersThumbnails = addPictures;

console.log(arrayProfiles());
addPictures(createProfilesArray());

