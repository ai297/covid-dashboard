const EVENTS = {
  defaultSettings: { bubbles: true, composed: true },
  UI: {
    searchInput: 'search-input',
    searchSelect: 'search-select',
    selectCountry: 'select-country',
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

  getShowSelectedEvent(countrySummaryData) {
    return new CustomEvent(this.DATA.showSummarySelected,
      { ...this.defaultSettings, detail: countrySummaryData });
  },

  getSelectCountryEvent(country) {
    return new CustomEvent(this.UI.selectCountry,
      { ...this.defaultSettings, detail: country });
  },

  getSearchInputEvent(value) {
    return new CustomEvent(this.UI.searchInput,
      { ...this.defaultSettings, detail: value });
  },

  getSearchSelectEvent(value) {
    return new CustomEvent(this.UI.searchSelect,
      { ...this.defaultSettings, detail: value });
  },
};
export default EVENTS;
