class AppWidget extends HTMLElement {
  constructor() {
    super();
    this.maximizeButton = document.createElement('label');
    this.maximizeButton.className = 'maximize-button';
    this.maximizeButton.innerHTML = `
      <div class="maximize-icon">
        <svg viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.41844 5.25791L3.08656 1.92617L5.00625 0H0V5.02292L1.94437 3.07206L5.27406 6.40161L6.41844 5.25791Z" />
          <path d="M8.58185 5.25791L11.9134 1.92617L9.99404 0H15V5.02292L13.0556 3.07206L9.72591 6.40161L8.58185 5.25791Z" />
          <path d="M8.58185 9.74209L11.9134 13.0738L9.99404 15H15V9.97677L13.0556 11.9276L9.72591 8.59839L8.58185 9.74209Z" />
          <path d="M6.41855 9.74209L3.08699 13.0738L5.00637 15H0.000427246V9.97677L1.9448 11.9276L5.27418 8.59839L6.41855 9.74209Z" />
        </svg>
      </div>
      <div class="minimize-icon">
        <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.4184 14.2579L12.0866 10.9262L14.0062 9H9V14.0229L10.9444 12.0721L14.2741 15.4016L15.4184 14.2579Z" />
          <path d="M0 14.2579L3.33156 10.9262L1.41219 9H6.41812V14.0229L4.47375 12.0721L1.14406 15.4016L0 14.2579Z" />
          <path d="M0 1.1437L3.33156 4.47544L1.41219 6.40161H6.41813V1.37838L4.47375 3.32924L1.14406 0L0 1.1437Z" />
          <path d="M15.4181 1.1437L12.0866 4.47544L14.0059 6.40161H9V1.37838L10.9444 3.32924L14.2738 0L15.4181 1.1437Z" />
        </svg>
      </div>
    `;
    this.checkbox = document.createElement('input');
    this.checkbox.setAttribute('type', 'checkbox');
    this.maximizeButton.prepend(this.checkbox);
    this.anchorElement = document.createElement('div');

    this.checkbox.addEventListener('change', (event) => this.maximize(event.target.checked));
  }

  maximize(value) {
    if (value) {
      this.activeElement.classList.add(this.getAttribute('maximized-class'));
      this.container.insertBefore(this.anchorElement, this.activeElement);
      document.body.append(this.activeElement);
      document.addEventListener('keydown', this.minimizeHandler);
    } else {
      document.removeEventListener('keydown', this.minimizeHandler);
      this.activeElement.classList.remove(this.getAttribute('maximized-class'));
      this.container.replaceChild(this.activeElement, this.anchorElement);
    }
  }

  minimizeHandler = (event) => {
    if (event.code === 'Escape') {
      this.checkbox.checked = false;
      this.maximize(false);
    }
  }

  connectedCallback() {
    const elementSelector = this.getAttribute('for');
    const element = elementSelector ? document.querySelector(elementSelector) : null;
    if (!this.container) this.container = element?.parentElement || this.parentElement;
    if (!this.activeElement) this.activeElement = element || this;
    this.append(this.maximizeButton);
  }
}
export default AppWidget;
