class SearchForm extends HTMLElement {
  constructor() {
    super();
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('placeholder', this.getAttribute('placeholder'));
    const searchButton = document.createElement('button');
    searchButton.setAttribute('type', 'button');
    searchButton.innerHTML = `
      <svg viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.8502 10.6918H5.61807L5.89022 10.4294C4.93768 9.32133 4.36421 7.88279 4.36421 6.3179C4.36421 2.82847 7.19268 0 10.6821 0C14.1715 0 17 2.82847 17 6.3179C17 9.80732 14.1715 12.6358 10.6821 12.6358C9.11721 12.6358 7.67867 12.0623 6.57061 11.1098L6.30818 11.3819V12.1498L1.44826 17L0 15.5517L4.8502 10.6918ZM10.6821 10.6918C13.1023 10.6918 15.056 8.73814 15.056 6.3179C15.056 3.89766 13.1023 1.94397 10.6821 1.94397C8.26186 1.94397 6.30818 3.89766 6.30818 6.3179C6.30818 8.73814 8.26186 10.6918 10.6821 10.6918Z" fill="currentColor"/>
      </svg>
    `;
    this.appendChild(inputElement);
    this.appendChild(searchButton);
    const customEventSettings = { bubbles: true, composed: true, detail: this };
    inputElement.addEventListener('input', (event) => {
      event.stopPropagation();
      this.dispatchEvent(new CustomEvent('search-input', { ...customEventSettings }));
    });
    searchButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this.dispatchEvent(new CustomEvent('search-click', { ...customEventSettings }));
    });

    Object.defineProperties(this, {
      value: {
        get: () => inputElement.value,
        set: (val) => {
          inputElement.value = val;
        },
      },
      clear: {
        value: () => {
          inputElement.value = '';
        },
      },
    });
  }
}
export default SearchForm;
