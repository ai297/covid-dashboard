import EVENTS from './events';
import CountrySection from './country-section';

class CountriesList extends HTMLUListElement {
  constructor() {
    super();
    window.addEventListener(EVENTS.DATA.showSummaryAll, (event) => {
      const data = event.detail;
      [this.worldwide] = data.splice(0, 1);
      this.showSummary(data);
    });
    window.addEventListener(EVENTS.DATA.showSummarySelected, (event) => {
      const countryName = event.detail.country;
      this.selectCountry(countryName);
    });

    window.addEventListener(EVENTS.UI.tabChange, (event) => {
      this.updateValues(event.detail.selected);
    });
    window.addEventListener(EVENTS.UI.searchInput, (event) => {
      if (!event.detail) this.append(...this.countrySections);
      else this.filter(event.detail.toLowerCase());
    });
    window.addEventListener(EVENTS.UI.searchSelect, (event) => {
      if (!event.detail) this.dispatchEvent(EVENTS.getSelectCountryEvent(this.worldwide?.country));
      else this.children[0].select();
    });
  }

  countrySections = []

  displayValue = 'cases'

  showSummary(data) {
    this.data = data;
    this.data.forEach((countryData, index) => {
      const country = new CountrySection();
      country.country = countryData.country;
      country.update(countryData[this.displayValue], this.displayValue);
      country.className = 'countries-list__item';
      country.index = index;
      this.countrySections.push(country);
    });
    this.sort();
  }

  updateValues(valueType) {
    this.displayValue = valueType;
    [...this.children].forEach((countrySection) => countrySection.update(
      this.data[countrySection.index][this.displayValue],
      this.displayValue,
    ));
    this.sort();
  }

  selectCountry(countryName) {
    if (this.selectedCountry && this.selectedCountry === countryName && this.worldwide) {
      this.selectedCountry = this.worldwide.country;
      this.dispatchEvent(EVENTS.getSelectCountryEvent(this.worldwide.country));
      return;
    }
    this.append(...this.countrySections);
    this.countrySections.map((cs) => cs.classList.remove('countries-list__item--selected'));
    const countrySection = this.countrySections.find((cs) => cs.country === countryName);
    if (!countrySection) return;
    countrySection.classList.add('countries-list__item--selected');
    const rectList = this.getBoundingClientRect();
    const rectCountry = countrySection.getBoundingClientRect();
    this.parentElement.scrollTop = rectCountry.top - rectList.top;
    this.selectedCountry = countryName;
  }

  filter(value) {
    function countryNameFilter(countrySection) {
      countrySection.remove();
      return countrySection.country.toLowerCase().startsWith(value);
    }
    this.append(...this.countrySections.filter(countryNameFilter));
    if (this.children.length === 1) this.children[0].select();
  }

  sort() {
    function valueComparer(countrySectionA, countrySectionB) {
      if (Number.isNaN(countrySectionA.value)) return 1;
      if (Number.isNaN(countrySectionB.value)) return -1;
      return countrySectionB.value - countrySectionA.value;
    }
    this.countrySections.sort(valueComparer);
    this.append(...this.countrySections);
    if (this.selectedCountry) this.selectCountry(this.selectedCountry);
  }
}
export default CountriesList;
