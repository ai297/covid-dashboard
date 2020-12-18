import EVENTS from './events';
import CountrySection from './country-section';

class CountriesList extends HTMLUListElement {
  constructor() {
    super();
    window.addEventListener(EVENTS.DATA.showSummaryAll, this.showSummary);
  }

  countries = []

  showSummary = (event) => {
    const summaryData = event.detail;
    summaryData.splice(0, 1);
    summaryData.forEach((countryData) => {
      const country = new CountrySection();
      country.country = countryData.country;
      country.value = countryData.cases;
      country.valueType = 'cases';
      country.className = 'countries-list__item';
      this.countries.push(country);
    });
    this.append(...this.countries);
  }
}
export default CountriesList;
