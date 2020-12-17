import getTemplate from './app-template';
import TabButton from './tab-button';
import TabsGroup from './tabs-group';
import SearchForm from './search-form';
import DataService from './data-service';

class App {
  constructor() {
    this.dataService = new DataService();
  }

  mount(element) {
    this.element = element;
    this.render();
  }

  render() {
    this.element.innerHTML = getTemplate();
  }
}

window.customElements.define('search-form', SearchForm);
window.customElements.define('tab-button', TabButton, { extends: 'label' });
window.customElements.define('tabs-group', TabsGroup);

export default App;
