import { mapSummaryData, mapDetailData, filterSummaryData } from './data-mapping';

// const SUMMARY_DATA_URL = 'https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&sort=cases';
// const WORLDWIDE_SUMMARY_DATA_URL = 'https://disease.sh/v3/covid-19/all?yesterday=false&twoDaysAgo=false';
// const COUNTRY_DETAIL_DATA_URL = 'https://disease.sh/v3/covid-19/historical/{country}?lastdays=360';
const SUMMARY_DATA_URL = './test-summary.json';
const WORLDWIDE_SUMMARY_DATA_URL = './test-worldwide-detail.json';
const COUNTRY_DETAIL_DATA_URL = './test-country-detail.json';

function resolveAll(callbacks, ...args) {
  callbacks.forEach((item) => {
    item.resolve(...args);
  });
}

function rejectAll(callbacks, ...args) {
  callbacks.forEach((item) => {
    item.reject(...args);
  });
}

/**
 * Class for getting data from api.
 */
class DataService {
  summaryLoadCallbacks = [];

  detailLoadCallbacks = [];

  /**
   * Getting summary data for all countries and worldwide
   * @returns {Promise<Array>} promise, that resolved with array of objects.
   *
   * @example
   * getSummary().then((data) => {});
   * data = [
   *  {
   *    country: 'Russia',
   *    population: 146748590,
   *    cases: 2629699,
   *    todayCases: 28080,
   *    recovered: 2086887,
   *    todayRecovered: 20277,
   *    deaths: 46404,
   *    todayDeaths: 488,
   *    info: {
   *      flag: url,
   *      long: 11,
   *      lat: 22,
   *    },
   *    updated: Date
   *  }
   * ]
   */
  getSummary() {
    if (this.summary) return Promise.resolve(this.summary);
    if (this.summaryLoadStarted) {
      return new Promise((resolve, reject) => {
        this.summaryLoadCallbacks.push({ resolve, reject });
      });
    }
    this.summaryLoadStarted = true;
    return new Promise((resolve, reject) => {
      this.summaryLoadCallbacks.push({ resolve, reject });
      fetch(WORLDWIDE_SUMMARY_DATA_URL).then((response) => {
        if (!response.ok) rejectAll(this.summaryLoadCallbacks, Error(`Worldwide summary data loading error (${response.status})`));
        else {
          response.json().then((data) => {
            this.summary = [mapSummaryData(data)];
            fetch(SUMMARY_DATA_URL).then((res) => {
              if (!res.ok) rejectAll(this.summaryLoadCallbacks, Error(`Countries summary data loading error (${res.status})`));
              else {
                res.json().then((summary) => {
                  this.summary.push(...filterSummaryData(summary).map(mapSummaryData));
                  resolveAll(this.summaryLoadCallbacks, [...this.summary]);
                }).finally(() => {
                  this.summaryLoadCallbacks = [];
                  this.summaryLoadStarted = false;
                });
              }
            }).catch((e) => {
              rejectAll(this.summaryLoadCallbacks, e);
              this.summaryLoadCallbacks = [];
              this.summaryLoadStarted = false;
            });
          });
        }
      }).catch((e) => {
        rejectAll(this.summaryLoadCallbacks, e);
        this.summaryLoadCallbacks = [];
        this.summaryLoadStarted = false;
      });
    });
  }

  getSummaryFor(countryName) {
    if (!this.summary) return {};
    return { ...this.summary.find(({ country }) => country === countryName) } || {};
  }

  /**
   * Getting detailed data for country
   * @argument {String} countryName
   * @returns {Promise<Array, Number>} promise, that resolved with two arguments -
   * detailed data and country population
   *
   * @example
   * getDetails('Russia').then((data) => {});
   * data.country = ...
   * data.population = ...
   * data.detail = [
   *  {
   *    date: '10/12/20',
   *    cases: 2546113,
   *    recovered: 44769,
   *    deaths: 44769,
   *  }
   * ]
   */
  getDetail(countryName) {
    const population = this.summary?.find(({ country }) => country === countryName)?.population;
    if (!this.detailLoadStarted && this.detailedCountry && this.detailedCountry === countryName) {
      return Promise.resolve(this.detail, population);
    }
    if (this.detailLoadStarted) {
      return new Promise((resolve, reject) => {
        this.detailLoadCallbacks.push({ resolve, reject });
      });
    }
    this.detailLoadStarted = true;
    this.detailedCountry = countryName;
    return new Promise((resolve, reject) => {
      this.detailLoadCallbacks.push({ resolve, reject });
      const url = COUNTRY_DETAIL_DATA_URL.replace('{country}', countryName === 'Worldwide' ? 'all' : countryName);
      fetch(url).then((response) => {
        if (!response.ok) rejectAll(this.detailLoadCallbacks, Error(`Country detail data loading error (${response.status})`));
        else {
          response.json().then((data) => {
            this.detail = mapDetailData(data);
            resolveAll(this.detailLoadCallbacks, {
              country: this.detailedCountry,
              population,
              detail: [...this.detail],
            });
          }).finally(() => {
            this.detailLoadCallbacks = [];
            this.detailLoadStarted = false;
          });
        }
      }).catch((e) => {
        rejectAll(this.detailLoadCallbacks, e);
        this.detailLoadCallbacks = [];
        this.detailLoadStarted = false;
      });
    });
  }
}
export default DataService;
