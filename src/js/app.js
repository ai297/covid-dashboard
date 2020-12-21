import DataService from './data-service';
import EVENTS from './events';


class App {
  constructor() {
    this.dataService = new DataService();

    window.addEventListener(EVENTS.UI.selectCountry, (event) => {
      this.selectCountry(event.detail);
    });
  }

  selectCountry(countryName) {
    window.dispatchEvent(
      EVENTS.getShowSelectedEvent(this.dataService.getSummaryFor(countryName))
    );
    this.dataService
      .getDetail(countryName)
      .then((detailData) => {
        window.dispatchEvent(EVENTS.getShowDetailEvent(detailData));
      })
      .catch(console.error); // TODO: обработать ошибку загрузки данных для графика
  }

  getData() {
    return new Promise((resolve, reject) => {
      // load summary data for all countries and worldwide (countries-list component)
      this.dataService
        .getSummary()
        .then((summary) => {
          window.dispatchEvent(
            new CustomEvent(EVENTS.DATA.showSummaryAll, {
              ...EVENTS.defaultSettings,
              detail: summary,
            })
          );
          // show summary for worldwide (right side table)
          window.dispatchEvent(
            EVENTS.getShowSelectedEvent(
              this.dataService.getSummaryFor('Worldwide')
            )
          );
          // load worldwide detail data (chart component)
          this.dataService
            .getDetail('Worldwide')
            .then((detailData) => {
              window.dispatchEvent(EVENTS.getShowDetailEvent(detailData));
              resolve();
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }

  start() {
    this.getData()
      .then(() => {
        // hide loader
      })
      .catch(console.error); // TODO: обработать ошибку загрузки данных
  }
}

export default App;
