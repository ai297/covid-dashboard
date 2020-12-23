import EVENTS from './events';

class AppTable extends HTMLTableElement {
  constructor() {
    super();
    window.addEventListener(EVENTS.DATA.showSummarySelected, (event) => {
      this.data = event.detail;
      this.updateTable();
    });
    window.addEventListener(EVENTS.UI.switchChange, (event) => {
      switch (event.detail.name) {
      case 'period':
        this.isShowAllTime = !event.detail.value;
        break;
      case 'amount-pacients':
        this.isShowAbsolute = !event.detail.value;
        break;
      default:
        this.isShowAllTime = true;
        this.isShowAbsolute = true;
        break;
      }
      this.updateTable();
    });
  }

  isShowAbsolute = true;

  isShowAllTime = true;

  updateTable() {
    this.innerHTML = `<tr>
                        <td>Cases</td>
                        <td class="cases">${this.getTableDataFor('cases')}</td>
                      </tr>
                      <tr>
                        <td>Recovered</td>
                        <td class="recovered">${this.getTableDataFor('recovered')}</td>
                      </tr>
                      <tr>
                        <td>Deaths</td>
                        <td class="deaths">${this.getTableDataFor('deaths')}</td>
                      </tr>`;
  }

  getTableDataFor(valueType) {
    const todayField = `today${valueType[0].toUpperCase()}${valueType.slice(1)}`;
    let value = this.isShowAllTime ? this.data[valueType] : this.data[todayField];
    value = this.isShowAbsolute ? value : (100000 * (value / this.data.population)).toFixed(2);
    return value;
  }
}
export default AppTable;
