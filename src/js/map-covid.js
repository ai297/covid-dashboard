import EVENTS from './events';
import MapAdapter from './map-adapter';
import MapLegend from './map-legend';

const MARKER_COLORS = {
  cases: '#53B9EA',
  recovered: '#50E3C2',
  deaths: '#E3507A',
};
const MARKER_STEPS = [0.01, 0.08, 0.2, 0.5, 0.8];
const MARKER_BASE_SIZE = 4;

class MapCovid extends HTMLElement {
  constructor() {
    super();

    this.mapContainer = document.createElement('div');
    this.legend = new MapLegend();
    this.legend.className = 'dashboard__section map-legend';
    this.append(this.mapContainer);
    this.parentElement.append(this.legend);
    this.map = new MapAdapter(this.mapContainer);

    window.addEventListener(EVENTS.DATA.showSummaryAll, (event) => {
      this.data = event.detail;
      this.map.fillLayer(this.createPopUpHTML, this.selectCountry);
      this.updateValues(this.displayValue);
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
    const maxVlue = this.data.slice(2).reduce((acc, countryInfo) => {
      const val = this.getValueFor(countryInfo);
      return val > acc ? val : acc;
    }, this.getValueFor(this.data[1]));

    const points = this.data.filter((c) => c.coords).map((countryInfo) => {
      const radius = (MARKER_STEPS.findIndex((s) => this.getValueFor(countryInfo) < s * maxVlue)
        + 1) * MARKER_BASE_SIZE;
      return {
        long: countryInfo.coords.long,
        lat: countryInfo.coords.lat,
        radius: radius || MARKER_BASE_SIZE * (MARKER_STEPS.length + 1),
      };
    });
    this.map.updateMarkers(MARKER_COLORS[this.displayValue], points);
    const markerValues = MARKER_STEPS.map((v) => v * maxVlue);
    this.legend.updateLegend(
      MARKER_COLORS[this.displayValue], MARKER_BASE_SIZE * 2, ...markerValues,
    );
  }

  getValueFor(countryInfo) {
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
