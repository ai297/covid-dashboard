import getTemplate from './app-template';
// import DataService from './data-service';
import SearchForm from './search-form';

class App {
  mount(element) {
    this.element = element;
    this.render();
  }

  render() {
    this.element.innerHTML = getTemplate();
  }
}

window.customElements.define('search-form', SearchForm);
export default App;
