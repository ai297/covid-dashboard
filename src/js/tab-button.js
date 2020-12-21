import EVENTS from './events';

class TabButton extends HTMLLabelElement {
  constructor() {
    super();
    this.labelTitle = document.createElement('div');
    this.labelTitle.innerText = this.getAttribute('title');
    this.inputElement = document.createElement('input');
    this.inputElement.type = 'radio';
    this.inputElement.checked = this.getAttribute('selected');
    this.inputElement.addEventListener('change', (event) => {
      event.stopPropagation();
      if (this.inputElement.checked) {
        window.dispatchEvent(EVENTS.getTabChangeEvent(this.getAttribute('name'), this.getAttribute('value')));
      }
    });
  }

  connectedCallback() {
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
