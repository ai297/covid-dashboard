const EVENTS = {
  defaultSettings: { bubbles: true, composed: true },
  UI: {
    searchInput: 'search-imput',
    searchSelect: 'search-select',
    selectCountry: 'selectCountry',
    tabChange: 'tab-change',
  },

  DATA: {
    showSummaryAll: 'show-summary-all',
    showSummarySelected: 'show-summary-selected',
    showDetail: 'show-detail',
  },

  getShowDetailEvent({ country, population, detail }) {
    return new CustomEvent(this.DATA.showDetail,
      { ...this.defaultSettings, detail: { country, population, detail } });
  },

  getSelectCountryEvent(country) {
    return new CustomEvent(this.UI.selectCountry,
      { ...this.defaultSettings, detail: country });
  },
};
export default EVENTS;
