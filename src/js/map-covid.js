import mapboxgl from 'mapbox-gl';

class MapCovid extends HTMLElement {
  constructor() {
    super();

    this.mapContainer = document.createElement('div');
    this.mapContainer.setAttribute('id', 'map');
  }

  connectedCallback() {
    this.append(this.mapContainer);

    const mapBoxAPIKey =
      'pk.eyJ1IjoibGlrdmlkYXMiLCJhIjoiY2tpdnAyODhtM2M2dTMycWpnMXFiYXZwaCJ9.fozESJf22S8KduoAexP0Eg';

    mapboxgl.accessToken = mapBoxAPIKey;
    // eslint-disable-next-line no-unused-vars
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [20, 40],
      zoom: 1,
    });
  }
}

export default MapCovid;
