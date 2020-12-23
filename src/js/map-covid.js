import EVENTS from './events';
import MapAdapter from './map-adapter';

const MARKER_COLORS = {
  cases: '#53B9EA',
  recovered: '#50E3C2',
  deaths: '#E3507A',
};

class MapCovid extends HTMLElement {
  constructor() {
    super();

    this.mapContainer = document.createElement('div');
    this.append(this.mapContainer);
    this.map = new MapAdapter(this.mapContainer);

    window.addEventListener(EVENTS.DATA.showSummaryAll, (event) => {
      this.data = event.detail;
      this.map.fillLayer(this.createPopUpHTML, this.selectCountry);
      this.map.updateMarkers(MARKER_COLORS[this.displayValue], this.data, this.getValueFor);
    });
    window.addEventListener(EVENTS.DATA.showSummarySelected, (event) => {
      const { coords } = event.detail;
      if (coords) this.map.flyTo(coords.long, coords.lat);
    });

    window.addEventListener(EVENTS.UI.tabChange, (event) => {
      this.updateValues(event.detail.value);
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
  }

  displayValue = 'cases';

  isShowAbsolute = true;

  isShowAllTime = true;

  updateValues(value) {
    this.displayValue = value;
    this.map.updateMarkers(MARKER_COLORS[this.displayValue], this.data, this.getValueFor);
  }

  getValueFor = (countryInfo) => {
    const todayField = `today${this.displayValue[0].toUpperCase()}${this.displayValue.slice(1)}`;
    let value = this.isShowAllTime ? countryInfo[this.displayValue]
      : countryInfo[todayField];
    value = this.isShowAbsolute ? value : (100000 * (value / countryInfo.population));
    return +value.toFixed(2);
  }

  createPopUpHTML = (isoCode, name) => {
    const countryInfo = this.data?.find((c) => c.iso === isoCode);
    if (countryInfo) {
      return `
        <div class="map-popup__country-name">${countryInfo.country}</div>
        <div class="map-popup__value">
          <span>${this.displayValue}:</span>
          <span class="${this.displayValue}">${this.getValueFor(countryInfo)}</span>
        </div>
      `;
    }
    return name;
  }

  selectCountry = (isoCode) => {
    const countryInfo = this.data?.find((c) => c.iso === isoCode);
    if (countryInfo) this.dispatchEvent(EVENTS.getSelectCountryEvent(countryInfo.country));
  };
}

export default MapCovid;
