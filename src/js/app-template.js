/**
 * Шаблон вёрстки, пока просто в виде строки
 * Используемые кастомные теги (web components)
 * (можно переименовать или что-то ещё выделить в компоненты)
 * @example
 * search-field
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
    <section class="dashboard__section dashboard__header"><h1>Covid-2019 dashboard</h1></section>
    <section class="dashboard__section">
      <search-field class="search-form">Placeholder?</search-field>
      <countries-list class="countries-list">
        <countries-list-item class="countries-list__item" flag="./flag icon url" name="USA">16135597</countries-list-item>
        <countries-list-item class="countries-list__item" flag="./flag icon url" name="Russia">2629699</countries-list-item>
      </countries-list>
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
    <section class="dashboard__section">
      <p>Last update: 14.12.2020 12:00</p>
    </section>
  </div>
  <div class="dashboard__column dashboard__column--map-column">
    <section class="map-section"></section>
    <section class="map-controls">
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
      <table class="widget-table">
        <tr>
          <td>Cases</td>
          <td>71986171</td>
        </tr>
        <tr>
          <td>Recovered</td>
          <td>47022409</td>
        </tr>
        <tr>
          <td>Deaths</td>
          <td>1609413</td>
        </tr>
      </table>
      <toggle-group class="toggle-group">
        <toggle-button class="toggle-group__button" active="true">Today / All time</toggle-button>
        <toggle-button>Total / p 100k</toggle-button>
      </toggle-group>
    </section>
    <section class="dashboard__section">
      <app-chart class="chart"></app-chart>
      <toggle-group class="toggle-group">
        <toggle-button class="toggle-group__button" active="true">Today / All time</toggle-button>
        <toggle-button>Total / p 100k</toggle-button>
      </toggle-group>
    </section>
  </div>
`;
export default getTemplate;
