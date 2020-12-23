import mapboxgl from 'mapbox-gl';
import createGeoJson from './map-markers-geojson';

const MAPBOX_API_KEY = 'pk.eyJ1IjoibGlrdmlkYXMiLCJhIjoiY2tpdnAyODhtM2M2dTMycWpnMXFiYXZwaCJ9.fozESJf22S8KduoAexP0Eg';
const MAP_COUNTRIES_LAYER = 'country-fills';
const MAP_MARKERS_LAYER = 'markers';

export default class MapAdapter {
  constructor(container) {
    mapboxgl.accessToken = MAPBOX_API_KEY;
    this.map = new mapboxgl.Map({
      container,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [20, 20],
      zoom: 1.5,
    });

    this.map.on('load', () => {
      this.map.addSource('countries', {
        type: 'geojson',
        data:
          './countries.geojson',
        generateId: true,
      });

      this.isLoaded = true;
      this.fillAfterLoadCallback?.call(this);
      this.apdateMarkersAfterLoadCallback?.call(this);
    });

    this.popup = new mapboxgl.Popup({
      closeButton: false,
      offset: {
        bottom: [0, -15],
      },
      className: 'map-popup',
    });
  }

  isLoaded = false;

  fillLayer(getPopupHTMLCallback, onClickCallback) {
    if (!this.isLoaded) {
      this.fillAfterLoadCallback = () => this.fillLayer(getPopupHTMLCallback, onClickCallback);
      return;
    }

    this.map.addLayer({
      id: MAP_COUNTRIES_LAYER,
      type: 'fill',
      source: 'countries',
      layout: {},
      paint: {
        'fill-color': '#CBCFD4',
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.25,
          0,
        ],
      },
    });

    let hoverStateId = null;
    this.map.on('mousemove', MAP_COUNTRIES_LAYER, (e) => {
      if (e.features.length > 0) {
        if (hoverStateId) {
          this.map.setFeatureState(
            { source: 'countries', id: hoverStateId },
            { hover: false },
          );
        }
        hoverStateId = e.features[0].id;
        this.map.setFeatureState(
          { source: 'countries', id: hoverStateId },
          { hover: true },
        );
        this.popup
          .setLngLat(e.lngLat)
          .setHTML(getPopupHTMLCallback?.call(
            this, e.features[0].properties.iso_a3, e.features[0].properties.name,
          ) || e.features[0].properties.name)
          .addTo(this.map);
      }
    });

    this.map.on('mouseleave', MAP_COUNTRIES_LAYER, () => {
      this.popup.remove();
      if (hoverStateId) {
        this.map.setFeatureState(
          { source: 'countries', id: hoverStateId },
          { hover: false },
        );
      }
      hoverStateId = null;
    });

    this.map.on('click', MAP_COUNTRIES_LAYER, (e) => {
      console.log(e);
      onClickCallback?.call(this, e.features[0].properties.iso_a3);
    });
  }

  updateMarkers(color, data, valueCallback) {
    if (!this.isLoaded) {
      this.apdateMarkersAfterLoadCallback = () => this.updateMarkers(color, data, valueCallback);
      return;
    }
    if (this.map.getLayer(MAP_MARKERS_LAYER)) {
      this.map.removeLayer(MAP_MARKERS_LAYER);
      this.map.removeSource(MAP_MARKERS_LAYER);
    }
    this.map.addLayer({
      id: MAP_MARKERS_LAYER,
      type: 'circle',
      source: {
        type: 'geojson',
        data: createGeoJson(data, valueCallback),
      },
      paint: {
        'circle-color': color,
        'circle-opacity': 0.8,
        'circle-radius': ['get', 'radius'],
      },
    });
    // this.map.moveLayer(MAP_MARKERS_LAYER, MAP_COUNTRIES_LAYER);
  }

  flyTo(long, lat) {
    this.map.flyTo({ center: [long, lat], zoom: 3.5 });
  }
}
