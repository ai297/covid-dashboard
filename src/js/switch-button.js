import EVENTS from './events';

class SwitchButton extends HTMLLabelElement {
  constructor() {
    super();
    this.span = document.createElement('span');
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
    if (this.checkbox.checked) {
      this.span.textContent = this.getAttribute('value-checked');
    } else {
      this.span.textContent = this.getAttribute('value-unchecked');
    }
  }

  connectedCallback() {
    this.span.textContent = this.getAttribute('value-unchecked');
    this.append(this.span, this.checkbox);
  }
}

export default SwitchButton;
