import getTemplate from './app-template';
import TabButton from './tab-button';
import TabsGroup from './tabs-group';
import SearchForm from './search-form';
import DataService from './data-service';

class App {
  constructor() {
    this.dataService = new DataService();
  }

  getData() {
    return new Promise((resolve, reject) => {
      this.dataService.getSummary().then((summary) => {
        console.log(summary);
        this.dataService.getDetail('Worldwide').then((detailData) => {
          console.log(detailData);
          resolve();
        }).catch(reject);
      }).catch(reject);
    });
  }

  mount(element) {
    this.element = element;
    // show loader screen
    this.getData().then(() => {
      // hide loader
      this.render();
    }).catch(() => console.log('Show error screen'));
  }

  render() {
    this.element.innerHTML = getTemplate();
  }
}

window.customElements.define('search-form', SearchForm);
window.customElements.define('tab-button', TabButton, { extends: 'label' });
window.customElements.define('tabs-group', TabsGroup);

export default App;
