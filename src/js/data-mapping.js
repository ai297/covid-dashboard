export function mapSummaryData(data) {
  return {
    country: data.country ? data.country : 'Worldwide',
    population: data.population,
    cases: data.cases,
    todayCases: data.todayCases,
    deaths: data.deaths,
    todayDeaths: data.todayDeaths,
    recovered: data.recovered,
    todayRecovered: data.todayRecovered,
    info: data.countryInfo ? {
      flag: data.countryInfo.flag,
      long: data.countryInfo.long,
      lat: data.countryInfo.lat,
    } : null,
    updated: new Date(data.updated),
  };
}

/* eslint-disable */
export function filterSummaryData(data) {
  return data.filter((country) => country.countryInfo && country.countryInfo._id);
}
/* eslint-enable */

export function mapDetailData(data) {
  const timeline = data.timeline ? data.timeline : data;
  const result = [];
  Object.keys(timeline.cases).forEach((date) => {
    result.push({
      date,
      cases: timeline.cases[date],
      recovered: timeline.recovered[date],
      deaths: timeline.deaths[date],
    });
  });
  return result;
}
