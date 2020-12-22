import './styles/style.scss';
import App from './js/app';
import AppWidget from './js/app-widget';
import TabButton from './js/tab-button';
import TabsGroup from './js/tabs-group';
import SearchForm from './js/search-form';
import CountriesList from './js/countries-list';
import CountrySection from './js/country-section';
import SwitchButton from './js/switch-button';
import MapCovid from './js/map-covid';
import LastUpdate from './js/last-update-section';
import AppChart from './js/app-chart';
import AppTable from './js/app-table';
import CountryTitle from './js/country-title';

window.customElements.define('app-widget', AppWidget);
window.customElements.define('search-form', SearchForm);
window.customElements.define('countries-list', CountriesList, { extends: 'ul' });
window.customElements.define('country-section', CountrySection, { extends: 'li' });
window.customElements.define('tab-button', TabButton, { extends: 'label' });
window.customElements.define('tabs-group', TabsGroup);
window.customElements.define('switch-btn', SwitchButton, { extends: 'label' });
window.customElements.define('map-cov', MapCovid);
window.customElements.define('app-chart', AppChart);
window.customElements.define('last-update-section', LastUpdate);
window.customElements.define('app-table', AppTable, { extends: 'table' });
window.customElements.define('country-title', CountryTitle, { extends: 'h2' });

new App().start();
