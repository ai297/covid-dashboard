import EVENTS from './events';

class CountryTitle extends HTMLHeadingElement {
  constructor() {
    super();
    window.addEventListener(EVENTS.DATA.showSummarySelected, (event) => {
      this.innerHTML = `<country-flag class="country-flag" country="${event.detail.country}"></country-flag><span>${event.detail.country}</span>`;
    });
  }
}
export default CountryTitle;
