export function mapSummaryData(data) {
  return {
    country: data.country ? data.country : 'Worldwide',
    iso: data.countryInfo?.iso3,
    population: data.population,
    cases: data.cases,
    todayCases: data.todayCases,
    deaths: data.deaths,
    todayDeaths: data.todayDeaths,
    recovered: data.recovered,
    todayRecovered: data.todayRecovered,
    coords: data.countryInfo ? {
      long: data.countryInfo.long,
      lat: data.countryInfo.lat,
    } : null,
    updated: data.updated,
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

export function getDailyData(data) {
  const output = [];
  let sum = {};
  data.forEach((num, index) => {
    if (index === 0) {
      output[index] = num;
      sum = {
        cases: num.cases,
        recovered: num.recovered,
        deaths: num.deaths,
      };
    } else {
      output[index] = {
        date: num.date,
        cases: num.cases - sum.cases,
        recovered: num.recovered - sum.recovered,
        deaths: num.deaths - sum.deaths,
      };
      sum = {
        cases: num.cases,
        recovered: num.recovered,
        deaths: num.deaths,
      };
    }
  });
  return output;
}
