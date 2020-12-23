import mapboxgl from 'mapbox-gl';

export default function createMap(container) {
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
          .setHTML(`<div>${e.features[0].properties.name}</div>`)
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
  return map;
}
