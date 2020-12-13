/**
 * Class for getting data from api.
 */
class DataService {
  constructor() {
    this.summary = [
      {
        country: 'Worldwide',
        population: 7827000000,
        cases: 71986171,
        todayCases: 424663,
        recovered: 47022409,
        todayRecovered: 279264,
        deaths: 1609413,
        todayDeaths: 6277,
      },
      {
        country: 'USA',
        population: 328915700,
        cases: 16135597,
        todayCases: 113310,
        recovered: 6246605,
        todayRecovered: 45976,
        deaths: 298465,
        todayDeaths: 776,
      },
      {
        country: 'Russia',
        population: 146748590,
        cases: 2629699,
        todayCases: 28080,
        recovered: 2086887,
        todayRecovered: 20277,
        deaths: 46404,
        todayDeaths: 488,
      },
    ];

    this.details = {
      Worldwide: [
        {
          date: '12/10/20',
          cases: 69592554,
          recovered: 44871360,
          deaths: 1581856,
        },
        {
          date: '12/11/20',
          cases: 71081574,
          recovered: 45349922,
          deaths: 1594777,
        },
        {
          date: '12/12/20',
          cases: 71704885,
          recovered: 46856934,
          deaths: 1605017,
        },
      ],
      Russia: [
        {
          date: '10/12/20',
          cases: 2546113,
          recovered: 44769,
          deaths: 44769,
        },
        {
          date: '11/12/20',
          cases: 2574319,
          recovered: 2041006,
          deaths: 45370,
        },
        {
          date: '12/12/20',
          cases: 2602048,
          recovered: 2066710,
          deaths: 45923,
        },
      ],
      USA: [
        {
          date: '12/12/20',
          cases: 16135597,
          recovered: 6246605,
          deaths: 46404,
        },
      ],
    };
  }

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
   *  }
   * ]
   */
  getSummary() {
    return Promise.resolve(this.summary);
  }

  /**
   * Getting detailed data for country
   * @argument {String} countryName
   * @returns {Promise<Array, Number>} promise, that resolved with two arguments -
   * detailed data and country population
   *
   * @example
   * getDetails('Russia').then((details, population) => {});
   * details = [
   *  {
   *    date: '10/12/20',
   *    cases: 2546113,
   *    recovered: 44769,
   *    deaths: 44769,
   *  }
   * ]
   */
  getDetails(countryName) {
    const population = this.summary.find(({ country }) => country === countryName)?.population;
    return Promise.resolve(this.details[countryName], population);
  }
}
export default DataService;
