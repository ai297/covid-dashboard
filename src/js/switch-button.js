import EVENTS from './events';

class SwitchButton extends HTMLLabelElement {
  constructor() {
    super();

    this.leftSpan = document.createElement('span');
    this.leftSpan.classList.add('toggle__label');
    this.leftSpan.classList.add('toggle__label--left');
    this.rightSpan = document.createElement('span');
    this.rightSpan.classList.add('toggle__label');
    this.rightSpan.classList.add('toggle__label--right');
    this.leftSpan.textContent = this.getAttribute('value-checked');
    this.rightSpan.textContent = this.getAttribute('value-unchecked');
    this.checkbox = document.createElement('input');
    this.checkbox.setAttribute('type', 'checkbox');
    this.checkbox.addEventListener('change', (e) => {
      e.stopPropagation();
      if (!this.notDispatchEvent) {
        this.dispatchEvent(EVENTS.getSwitchChangeEvent(this.getAttribute('name'), this.checkbox.checked));
      }
      this.notDispatchEvent = false;
    });
    window.addEventListener(EVENTS.UI.switchChange, (event) => {
      if (event.detail.name === this.getAttribute('name')) this.handlerChange(event.detail.value);
    });
  }

  handlerChange(value) {
    this.checkbox.checked = value;
    this.notDispatchEvent = true;
  }

  connectedCallback() {
    this.append(this.checkbox, this.leftSpan, this.rightSpan);
  }
}

export default SwitchButton;
