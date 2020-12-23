export const MARKER_STEPS = [0.05, 0.1, 0.2, 0.4, 0.8];

export default function createGeoJson(summaryData, currentDataCallback) {
  const maxVlue = summaryData.slice(2).reduce((acc, countryInfo) => {
    const val = currentDataCallback(countryInfo);
    return val > acc ? val : acc;
  }, currentDataCallback(summaryData[1]));

  const baseMarkerSize = 4;

  function mapCountryInfo(countryInfo) {
    const value = currentDataCallback(countryInfo);
    const radius = (MARKER_STEPS.findIndex((s) => value < s * maxVlue) + 1) * baseMarkerSize;
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [countryInfo.coords.long, countryInfo.coords.lat],
      },
      properties: {
        radius: radius || (MARKER_STEPS.length + 1) * baseMarkerSize,
      },
    };
  }

  return {
    type: 'FeatureCollection',
    features: [...summaryData.filter((c) => c.coords).map(mapCountryInfo)],
  };
}
