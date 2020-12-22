import EVENTS from './events';
import CountryFlag from './country-flag';

class CountrySection extends HTMLLIElement {
  constructor() {
    super();
    this.flagElement = new CountryFlag();
    this.flagElement.className = 'country-flag';
    this.countryNameElement = document.createElement('span');
    this.countryNameElement.className = 'country-name';
    this.valueElement = document.createElement('span');
    this.addEventListener('click', (event) => {
      event.stopPropagation();
      this.select();
    });
  }

  select() {
    this.dispatchEvent(EVENTS.getSelectCountryEvent(this.country));
  }

  connectedCallback() {
    this.append(this.flagElement, this.countryNameElement, this.valueElement);
  }

  update(value, type) {
    this.valueElement.innerText = +value.toFixed(2) || 'No data';
    this.valueElement.className = type;
  }

  get country() {
    return this.countryNameElement.innerText;
  }

  set country(val) {
    this.countryNameElement.innerText = val;
    this.flagElement.country = val;
  }

  get value() {
    return Number(this.valueElement.innerText);
  }
}
export default CountrySection;
