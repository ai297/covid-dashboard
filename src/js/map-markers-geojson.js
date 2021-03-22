export default function createGeoJson(points) {
  function mapCountryInfo(point) {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [point.long, point.lat],
      },
      properties: {
        radius: point.radius,
      },
    };
  }

  return {
    type: 'FeatureCollection',
    features: [...points.map(mapCountryInfo)],
  };
}
