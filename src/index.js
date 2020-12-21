import './styles/style.scss';
import App from './js/app';
import TabButton from './js/tab-button';
import TabsGroup from './js/tabs-group';
import SearchForm from './js/search-form';
import CountriesList from './js/countries-list';
import CountrySection from './js/country-section';
import SwitchButton from './js/switch-button';
import MapCovid from './js/map-covid';

window.customElements.define('search-form', SearchForm);
window.customElements.define('countries-list', CountriesList, { extends: 'ul' });
window.customElements.define('country-section', CountrySection, { extends: 'li' });
window.customElements.define('tab-button', TabButton, { extends: 'label' });
window.customElements.define('tabs-group', TabsGroup);
window.customElements.define('switch-btn', SwitchButton, { extends: 'label' });
window.customElements.define('map-cov', MapCovid);

new App().start();
