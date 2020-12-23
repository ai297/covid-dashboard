import EVENTS from './events';
import createMap from './createMap';

class MapCovid extends HTMLElement {
  constructor() {
    super();

    this.mapContainer = document.createElement('div');
    this.mapContainer.setAttribute('id', 'map');

    window.addEventListener(EVENTS.DATA.showSummaryAll, (event) => {
      this.data = event.detail;
    });

    // map.on('mousemove', 'country-fills', (e) => {
    //   if (e.features.length > 0) {
    //     if (hoveredStateId) {
    //       map.setFeatureState(
    //         { source: 'countries', id: hoveredStateId },
    //         { hover: false },
    //       );
    //     }
    //     hoveredStateId = e.features[0].id;
    //     map.setFeatureState(
    //       { source: 'countries', id: hoveredStateId },
    //       { hover: true },
    //     );

    //     const currentCountry = e.features[0].properties;
    //     let currentIndicator;
    //     this.dataStorage.forEach((data) => {
    //       if (data.country === currentCountry.name) {
    //         currentIndicator = data[this.indicator];
    //       }
    //     });

    //     popup
    //       .setLngLat(e.lngLat)
    //       .setHTML(`
    //          <div>${currentCountry.name}</div>
    //          <div>${this.indicator.toUpperCase()}: ${currentIndicator}</div>`)
    //       .setMaxWidth('300px')
    //       .addTo(map);
    //   }
    // });

    // map.on('mouseleave', 'country-fills', () => {
    //   popup.remove();
    //   if (hoveredStateId) {
    //     map.setFeatureState(
    //       { source: 'countries', id: hoveredStateId },
    //       { hover: false },
    //     );
    //   }
    //   hoveredStateId = null;
    // });

    // map.addLayer({
    //   id: 'country-borders',
    //   type: 'line',
    //   source: 'countries',
    //   layout: {},
    //   paint: {
    //     'line-color': '#53B9EA',
    //     'line-width': 0.5,
    //   },
    // });
    // });

    // window.addEventListener(EVENTS.UI.tabChange, (event) => {
    //   this.indicator = event.detail.value;
    // });
    // window.addEventListener(EVENTS.UI.selectCountry, (event) => {
    //   this.selectCountry = event.detail;
    //   flyToCountry(this.selectCountry);
    // });
    this.append(this.mapContainer);
    this.map = createMap('map');
  }

  indicator = 'cases'

  flyToCountry(long, lat) {
    this.map.flyTo({ center: [long, lat], zoom: 5 });
  }
}

export default MapCovid;
