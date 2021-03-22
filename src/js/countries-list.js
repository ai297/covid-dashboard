import EVENTS from './events';
import CountrySection from './country-section';

class CountriesList extends HTMLUListElement {
  constructor() {
    super();
    window.addEventListener(EVENTS.DATA.showSummaryAll, (event) => {
      const data = [...event.detail];
      [this.worldwide] = data.splice(0, 1);
      this.showSummary(data);
    });

    window.addEventListener(EVENTS.UI.tabChange, (event) => {
      if (this.countrySections) this.updateValues(event.detail.value);
    });
    window.addEventListener(EVENTS.UI.switchChange, (event) => {
      switch (event.detail.name) {
      case 'period':
        this.isShowAllTime = !event.detail.value;
        break;
      case 'amount-pacients':
        this.isShowAbsolute = !event.detail.value;
        break;
      default:
        this.isShowAllTime = true;
        this.isShowAbsolute = true;
        break;
      }
      this.updateValues(this.displayValue);
    });
    window.addEventListener(EVENTS.UI.searchInput, (event) => {
      if (!event.detail) this.append(...this.countrySections);
      else this.filter(event.detail.trim().toLowerCase());
    });
    window.addEventListener(EVENTS.UI.searchSelect, (event) => {
      if (!event.detail) this.dispatchEvent(EVENTS.getSelectCountryEvent(this.worldwide?.country));
      else this.children[0].select();
    });
    this.addEventListener(EVENTS.UI.selectCountry, (event) => {
      const countryName = event.detail;
      if (countryName === this.selectedCountry) {
        event.stopPropagation();
        this.dispatchEvent(EVENTS.getSelectCountryEvent(this.worldwide.country));
        this.selectedCountry = this.worldwide.country;
      } else this.selectCountry(countryName);
    });
    window.addEventListener(EVENTS.UI.selectCountry, (event) => {
      this.selectCountry(event.detail);
    });
  }

  displayValue = 'cases';

  isShowAbsolute = true;

  isShowAllTime = true;

  showSummary(data) {
    this.data = data;
    this.countrySections = [];
    this.data.forEach((countryData, index) => {
      const country = new CountrySection();
      country.country = countryData.country;
      country.className = 'countries-list__item';
      country.index = index;
      this.countrySections.push(country);
    });
    this.selectedCountry = this.worldwide.country;
    this.updateValues(this.displayValue);
  }

  updateValues(valueType) {
    this.displayValue = valueType;
    this.countrySections.forEach((countrySection) => countrySection.update(
      this.getValueFor(countrySection.index),
      this.displayValue,
    ));
    this.sort();
  }

  getValueFor(index) {
    const todayField = `today${this.displayValue[0].toUpperCase()}${this.displayValue.slice(1)}`;
    let value = this.isShowAllTime ? this.data[index][this.displayValue]
      : this.data[index][todayField];
    value = this.isShowAbsolute ? value : (100000 * (value / this.data[index].population));
    return value;
  }

  selectCountry(countryName) {
    this.append(...this.countrySections);
    this.countrySections.map((cs) => cs.classList.remove('countries-list__item--selected'));
    const countrySection = this.countrySections.find((cs) => cs.country === countryName);
    if (!countrySection) return;

    countrySection.classList.add('countries-list__item--selected');
    const rectContainer = this.parentElement.getBoundingClientRect();
    const rectCountry = countrySection.getBoundingClientRect();
    // console.log(rectContainer, rectCountry, this.parentElement.scrollTop);
    if (rectCountry.top < rectContainer.top
      || rectCountry.top > rectContainer.top + rectContainer.height) {
      this.parentElement.scrollTop = rectCountry.top - rectContainer.top;
    }
    this.selectedCountry = countryName;
  }

  filter(value) {
    function countryNameFilter(countrySection) {
      countrySection.remove();
      return countrySection.country.toLowerCase().startsWith(value);
    }
    this.append(...this.countrySections.filter(countryNameFilter));
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
