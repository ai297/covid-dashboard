import EVENTS from './events';

class LastUpdate extends HTMLElement {
  constructor() {
    super();
    this.textElement = document.createElement('p');

    window.addEventListener(EVENTS.DATA.showSummarySelected, (event) => {
      const lastUpdate = new Date(event.detail.updated);
      this.textElement.innerHTML = `Last update: <span>${lastUpdate.toLocaleString()}</span>`;
    });
  }

  connectedCallback() {
    this.append(this.textElement);
  }
}
export default LastUpdate;
