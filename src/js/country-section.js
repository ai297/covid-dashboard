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

  update(value, type) {
    this.valueElement.innerText = value || 'No data';
    this.valueElement.className = type;
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
    return Number(this.valueElement.innerText);
  }
}
export default CountrySection;
