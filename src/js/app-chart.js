import Chart from 'chart.js';
import { getDailyData } from './data-mapping';
import EVENTS from './events';

const BACKGROUND_COLORS = {
  cases: 'rgba(54, 162, 235, 0.2)',
  recovered: 'rgba(75, 192, 192, 0.2)',
  deaths: 'rgba(255, 99, 132, 0.2)',
};

const BORDER_COLORS = {
  cases: 'rgba(54, 162, 235, 1)',
  recovered: 'rgba(75, 192, 192, 1)',
  deaths: 'rgba(255, 99, 132, 1)',
};

class AppChart extends HTMLElement {
  constructor() {
    super();
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    this.context = canvas.getContext('2d');
    this.append(canvas);
    this.createChart();
    window.addEventListener(EVENTS.DATA.showDetail, (event) => {
      this.countryName = event.detail.country;
      this.countryPopulation = event.detail.population;
      this.cumulativeData = event.detail.detail;
      console.log(this.cumulativeData);
      this.updateChart();
    });

    window.addEventListener(EVENTS.UI.tabChange, (event) => {
      if (this.cumulativeData) this.displayValue = event.detail.selected;
      this.updateChart();
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
      this.updateChart();
    });
  }

  displayValue = 'cases';

  isShowAbsolute = true;

  isShowAllTime = true;

  createChart() {
    this.cfg = {
      type: 'bar',
      data: {
        datasets: [],
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month',
            },
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    };
    this.chart = new Chart(this.context, this.cfg);
  }

  updateChart() {
    this.cfg.data.datasets.pop();
    this.cfg.data.datasets.push({
      label: `${this.countryName}, ${this.displayValue}`,
      data: this.getDataForChart(),
      backgroundColor: BACKGROUND_COLORS[this.displayValue],
      borderColor: BORDER_COLORS[this.displayValue],
      borderWidth: 1,
    });
    this.chart.update();
  }

  getDataForChart() {
    let chartData = this.isShowAllTime
      ? this.cumulativeData
      : getDailyData(this.cumulativeData);
    chartData = chartData.map((elem) => ({ x: Date.parse(elem.date), y: elem[this.displayValue] }));
    chartData = this.isShowAbsolute
      ? chartData
      : chartData.map((elem) => (100000 * (elem[this.displayValue] / this.countryPopulation)));
    return chartData;
  }
}
export default AppChart;
