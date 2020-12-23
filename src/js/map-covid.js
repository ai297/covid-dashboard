import mapboxgl from 'mapbox-gl';
import EVENTS from './events';

class MapCovid extends HTMLElement {
  constructor() {
    super();

    this.mapContainer = document.createElement('div');
    this.mapContainer.setAttribute('id', 'map');
    this.indicator = 'cases';

    window.addEventListener(EVENTS.DATA.showSummaryAll, (event) => {
      this.dataStorage = event.detail;
      console.log(event);
    });
    this.append(this.mapContainer);

    const mapBoxAPIKey = 'pk.eyJ1IjoibGlrdmlkYXMiLCJhIjoiY2tpdnAyODhtM2M2dTMycWpnMXFiYXZwaCJ9.fozESJf22S8KduoAexP0Eg';

    mapboxgl.accessToken = mapBoxAPIKey;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [20, 40],
      zoom: 1,
    });

    let hoveredStateId = null;
    const markerHeight = 50;
    const markerRadius = 10;
    const linearOffset = 25;
    const popupOffsets = {
      top: [0, 0],
      'top-left': [0, 0],
      'top-right': [0, 0],
      bottom: [0, -markerHeight],
      'bottom-left': [
        linearOffset,
        (markerHeight - markerRadius + linearOffset) * -1,
      ],
      'bottom-right': [
        -linearOffset,
        (markerHeight - markerRadius + linearOffset) * -1,
      ],
      left: [markerRadius, (markerHeight - markerRadius) * -1],
      right: [-markerRadius, (markerHeight - markerRadius) * -1],
    };
    const popup = new mapboxgl.Popup({
      closeButton: false,
      offset: popupOffsets,
      className: 'popup-cov',
    });

    map.on('load', () => {
      map.addSource('countries', {
        type: 'geojson',
        data:
          'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson',
        generateId: true,
      });

      map.addLayer({
        id: 'country-fills',
        type: 'fill',
        source: 'countries',
        layout: {},
        paint: {
          'fill-color': '#50E3C2',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            0.5,
            0,
          ],
        },
      });

      map.on('mousemove', 'country-fills', (e) => {
        if (e.features.length > 0) {
          if (hoveredStateId) {
            map.setFeatureState(
              { source: 'countries', id: hoveredStateId },
              { hover: false },
            );
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState(
            { source: 'countries', id: hoveredStateId },
            { hover: true },
          );

          const currentCountry = e.features[0].properties;
          let currentIndicator;
          this.dataStorage.forEach((data) => {
            if (data.country === currentCountry.name) {
              currentIndicator = data[this.indicator];
            }
          });

          popup
            .setLngLat(e.lngLat)
            .setHTML(`<div>${currentCountry.name}</div><div>${this.indicator.toUpperCase()}: ${currentIndicator}</div>`)
            .setMaxWidth('300px')
            .addTo(map);
        }
      });

      map.on('mouseleave', 'country-fills', () => {
        popup.remove();
        if (hoveredStateId) {
          map.setFeatureState(
            { source: 'countries', id: hoveredStateId },
            { hover: false },
          );
        }
        hoveredStateId = null;
      });

      map.addLayer({
        id: 'country-borders',
        type: 'line',
        source: 'countries',
        layout: {},
        paint: {
          'line-color': '#53B9EA',
          'line-width': 0.5,
        },
      });
    });

    const flyToCountry = (country) => {
      let latittude;
      let longitude;
      this.dataStorage.forEach((data) => {
        if (data.country.toLowerCase() === country.toLowerCase()) {
          latittude = data.info.lat;
          longitude = data.info.long;
        }
      });

      map.flyTo({ center: [longitude, latittude], zoom: 5 });
    };

    window.addEventListener(EVENTS.UI.tabChange, (event) => {
      this.indicator = event.detail.value;
    });
    window.addEventListener(EVENTS.UI.selectCountry, (event) => {
      this.selectCountry = event.detail;
      flyToCountry(this.selectCountry);
    });
  }
}

export default MapCovid;
