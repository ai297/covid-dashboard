import './styles/style.scss';
import App from './js/app';
import VirtualKeyboard from './keyboard/keyboard';
import AppWidget from './js/app-widget';
import TabButton from './js/tab-button';
import TabsGroup from './js/tabs-group';
import SearchForm from './js/search-form';
import CountriesList from './js/countries-list';
import CountrySection from './js/country-section';
import CountryFlag from './js/country-flag';
import SwitchButton from './js/switch-button';
import MapCovid from './js/map-covid';
import LastUpdate from './js/last-update-section';
import AppChart from './js/app-chart';
import AppTable from './js/app-table';
import CountryTitle from './js/country-title';
import MapLegend from './js/map-legend';

window.customElements.define('app-widget', AppWidget);
window.customElements.define('search-form', SearchForm);
window.customElements.define('countries-list', CountriesList, { extends: 'ul' });
window.customElements.define('country-section', CountrySection, { extends: 'li' });
window.customElements.define('country-flag', CountryFlag);
window.customElements.define('tab-button', TabButton, { extends: 'label' });
window.customElements.define('tabs-group', TabsGroup);
window.customElements.define('switch-btn', SwitchButton, { extends: 'label' });
window.customElements.define('map-legend', MapLegend);
window.customElements.define('map-cov', MapCovid);
window.customElements.define('app-chart', AppChart);
window.customElements.define('last-update-section', LastUpdate);
window.customElements.define('app-table', AppTable, { extends: 'table' });
window.customElements.define('country-title', CountryTitle, { extends: 'h2' });

new App().start();
new VirtualKeyboard().addSounds({
  backspace: './sounds/backspace.wav',
  arrowleft: './sounds/arrows.wav',
  arrowright: './sounds/arrows.wav',
  capslock: './sounds/capslock.wav',
  shiftleft: './sounds/shift.wav',
  shiftright: './sounds/shift.wav',
  space: './sounds/space.wav',
  tab: './sounds/tab.wav',
  'en-US': './sounds/en.wav',
  voice: ['./sounds/voice-start.mp3', './sounds/voice-end.mp3'],
}).init();
