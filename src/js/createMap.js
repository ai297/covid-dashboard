import mapboxgl from 'mapbox-gl';

export default function createMap(container, getPopupHTMLCallback, onCLickCallback) {
  const mapBoxAPIKey = 'pk.eyJ1IjoibGlrdmlkYXMiLCJhIjoiY2tpdnAyODhtM2M2dTMycWpnMXFiYXZwaCJ9.fozESJf22S8KduoAexP0Eg';
  mapboxgl.accessToken = mapBoxAPIKey;
  const map = new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [20, 40],
    zoom: 1,
  });

  let hoveredStateId = null;
  const popupOffsets = {
    bottom: [0, -15],
  };
  const popup = new mapboxgl.Popup({
    closeButton: false,
    offset: popupOffsets,
    className: 'map-popup',
  });

  map.on('load', () => {
    map.addSource('countries', {
      type: 'geojson',
      data:
        './countries.geojson',
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
        popup
          .setLngLat(e.lngLat)
          .setHTML(getPopupHTMLCallback?.call(this, e.features[0].properties.iso_a3))
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

    map.on('click', 'country-fills', (e) => {
      onCLickCallback?.call(this, e.features[0].properties.iso_a3);
    });
  });
  return map;
}
