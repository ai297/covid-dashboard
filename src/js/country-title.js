import EVENTS from './events';

class CountryTitle extends HTMLHeadingElement {
  constructor() {
    super();
    window.addEventListener(EVENTS.DATA.showSummarySelected, (event) => {
      this.innerText = event.detail.country;
    });
  }
}
export default CountryTitle;
