/**
 * Шаблон вёрстки, пока просто в виде строки
 * Используемые кастомные теги (web components)
 * (можно переименовать или что-то ещё выделить в компоненты)
 * @example
 * search-form +
 * countries-list
 * countries-list-item
 * tabs-group
 * tabs-button
 * toggle-group
 * toggle-button
 * app-chart
 */
const getTemplate = () => `
  <div class="dashboard__column dashboard__column--widget-column">
    <section class="dashboard__section dashboard__header"><h1 class="widget-title">Covid-2019 dashboard</h1></section>
    <section class="dashboard__section dashboard__section--grow">
      <search-form class="search-form" placeholder="Select country"></search-form>
      <div class="widget-container widget-container--grow">
        <div class="widget-container__scroll custom-scrollbar">
          <countries-list class="countries-list">
            <countries-list-item class="countries-list__item" flag="./flag icon url" name="USA"><span class="cases">16135597</span></countries-list-item>
            <countries-list-item class="countries-list__item" flag="./flag icon url" name="Russia"><span class="cases">2629699</span></countries-list-item>
          </countries-list>
        </div>
      </div>
      <tabs-group class="tabs-group">
        <tabs-button class="tabs-group__button" selected="true">Cases</tabs-button>
        <tabs-button class="tabs-group__button">Recovered</tabs-button>
        <tabs-button class="tabs-group__button">Deaths</tabs-button>
      </tabs-group>
      <toggle-group class="toggle-group">
        <toggle-button class="toggle-group__button" active="true">Today / All time</toggle-button>
        <toggle-button>Total / p 100k</toggle-button>
      </toggle-group>
    </section>
    <section class="dashboard__section last-update">
      <p>Last update: 14.12.2020 12:00</p>
    </section>
  </div>
  <div class="dashboard__column dashboard__column--map-column">
    <section class="map-section">Map should be here</section>
    <section class="dashboard__section map-controls">
      <tabs-group class="tabs-group">
        <tabs-button class="tabs-group__button" selected="true">Cases</tabs-button>
        <tabs-button class="tabs-group__button">Recovered</tabs-button>
        <tabs-button class="tabs-group__button">Deaths</tabs-button>
      </tabs-group>
      <toggle-group class="toggle-group">
        <toggle-button class="toggle-group__button" active="true">Today / All time</toggle-button>
        <toggle-button>Total / p 100k</toggle-button>
      </toggle-group>
    </section>
  </div>
  <div class="dashboard__column dashboard__column--widget-column">
    <section class="dashboard__section">
      <h2 class="widget-title">Worldwide</h2>
      <div class="widget-container">
        <table class="widget-table">
          <tr>
            <td>Cases</td>
            <td class="cases">71986171</td>
          </tr>
          <tr>
            <td>Recovered</td>
            <td class="recovered">47022409</td>
          </tr>
          <tr>
            <td>Deaths</td>
            <td class="deaths">1609413</td>
          </tr>
        </table>
      </div>
      <toggle-group class="toggle-group">
        <toggle-button class="toggle-group__button" active="true">Today / All time</toggle-button>
        <toggle-button>Total / p 100k</toggle-button>
      </toggle-group>
    </section>
    <section class="dashboard__section">
      <div class="widget-container">
        <app-chart class="chart">Chart will be here</app-chart>
      </div>
      <toggle-group class="toggle-group">
        <toggle-button class="toggle-group__button" active="true">Today / All time</toggle-button>
        <toggle-button>Total / p 100k</toggle-button>
      </toggle-group>
    </section>
  </div>
`;
export default getTemplate;
