import EVENTS from './events';

class SwitchButton extends HTMLLabelElement {
  constructor() {
    super();

    this.leftSpan = document.createElement('span');
    this.leftSpan.className = 'toggle__label toggle__label--left';
    this.rightSpan = document.createElement('span');
    this.rightSpan.className = 'toggle__label toggle__label--right';
    this.checkbox = document.createElement('input');
    this.checkbox.setAttribute('type', 'checkbox');
    this.addEventListener('click', (e) => {
      e.stopPropagation();
      this.dispatchEvent(EVENTS.getSwitchChangeEvent(this.getAttribute('name'), this.checkbox.checked));
    });
    window.addEventListener(EVENTS.UI.switchChange, (event) => {
      if (event.detail.name === this.getAttribute('name')) this.checkbox.checked = event.detail.value;
    });
  }

  connectedCallback() {
    this.append(this.checkbox, this.leftSpan, this.rightSpan);
    this.leftSpan.textContent = this.getAttribute('value-checked');
    this.rightSpan.textContent = this.getAttribute('value-unchecked');
  }
}

export default SwitchButton;
