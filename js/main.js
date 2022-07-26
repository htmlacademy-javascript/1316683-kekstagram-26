import { getData } from './modules/api.js';
import { renderPictures } from './modules/pictures.js';
import { onChangeForm } from './modules/form.js';

getData(renderPictures);
onChangeForm();
