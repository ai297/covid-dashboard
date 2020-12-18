import EVENTS from './events';

class TabButton extends HTMLLabelElement {
  constructor() {
    super();
    this.labelTitle = document.createElement('div');
    this.labelTitle.innerHTML = this.innerHTML;
    this.inputElement = document.createElement('input');
    this.inputElement.type = 'radio';
    this.inputElement.value = this.innerHTML.toLowerCase();
    this.inputElement.checked = this.getAttribute('selected');
    this.inputElement.addEventListener('change', (event) => {
      event.stopPropagation();
      if (this.inputElement.checked) {
        window.dispatchEvent(new CustomEvent(EVENTS.UI.tabChange, {
          ...EVENTS.defaultSettings,
          detail: { name: this.inputElement.name, selected: this.inputElement.value },
        }));
      }
    });
  }

  connectedCallback() {
    this.innerHTML = '';
    this.appendChild(this.inputElement);
    this.appendChild(this.labelTitle);
  }

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name') {
      this.inputElement.setAttribute(name, newValue);
    }
  }
}

export default TabButton;
