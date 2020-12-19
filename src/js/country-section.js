import EVENTS from './events';

class CountrySection extends HTMLLIElement {
  constructor() {
    super();
    this.flagElement = document.createElement('img');
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

  get valueType() {
    return this.valueElement.className;
  }

  set valueType(val) {
    this.valueElement.className = val;
  }

  get flag() {
    return this.flagElement.src;
  }

  set flag(val) {
    this.flagElement.src = val;
  }

  get country() {
    return this.countryNameElement.innerText;
  }

  set country(val) {
    this.countryNameElement.innerText = val;
  }

  get value() {
    return this.valueElement.innerText;
  }

  set value(val) {
    this.valueElement.innerText = val;
  }
}
export default CountrySection;
