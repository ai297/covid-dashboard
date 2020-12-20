import EVENTS from './events';

class SearchForm extends HTMLElement {
  constructor() {
    super();
    this.inputElement = document.createElement('input');
    this.inputElement.setAttribute('type', 'text');
    this.inputElement.setAttribute('placeholder', this.getAttribute('placeholder'));
    this.searchButton = document.createElement('button');
    this.searchButton.setAttribute('type', 'button');
    this.searchButton.innerHTML = `
      <svg viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.8502 10.6918H5.61807L5.89022 10.4294C4.93768 9.32133 4.36421 7.88279 4.36421 6.3179C4.36421 2.82847 7.19268 0 10.6821 0C14.1715 0 17 2.82847 17 6.3179C17 9.80732 14.1715 12.6358 10.6821 12.6358C9.11721 12.6358 7.67867 12.0623 6.57061 11.1098L6.30818 11.3819V12.1498L1.44826 17L0 15.5517L4.8502 10.6918ZM10.6821 10.6918C13.1023 10.6918 15.056 8.73814 15.056 6.3179C15.056 3.89766 13.1023 1.94397 10.6821 1.94397C8.26186 1.94397 6.30818 3.89766 6.30818 6.3179C6.30818 8.73814 8.26186 10.6918 10.6821 10.6918Z" fill="currentColor"/>
      </svg>
    `;
    this.inputElement.addEventListener('input', this.inputHandler);
    this.searchButton.addEventListener('click', this.selectHandler);
    this.inputElement.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') this.selectHandler(event);
    });
    window.addEventListener(EVENTS.UI.selectCountry, () => {
      this.value = '';
    });
  }

  inputHandler = (event) => {
    event.stopPropagation();
    this.dispatchEvent(EVENTS.getSearchInputEvent(this.value));
  }

  selectHandler = (event) => {
    event.stopPropagation();
    this.dispatchEvent(EVENTS.getSearchSelectEvent(this.value));
  }

  get value() {
    return this.inputElement.value;
  }

  set value(val) {
    this.inputElement.value = val;
  }

  clear() {
    this.inputElement.value = '';
  }

  connectedCallback() {
    this.append(this.inputElement, this.searchButton);
  }
}
export default SearchForm;
