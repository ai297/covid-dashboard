class SwitchButton extends HTMLLabelElement {
  constructor() {
    super();

    this.span = document.createElement('span');
    this.span.classList.add('toggle__label');

    this.checkbox = document.createElement('input');
    this.checkbox.classList.add('toggle__checkbox');
    this.checkbox.addEventListener('change', (e) => {
      e.stopPropagation();
      this.handlerChange();
    });
  }

  handlerChange() {
    if (this.checkbox.checked) {
      this.span.textContent = this.getAttribute('value-checked');
    } else {
      this.span.textContent = this.getAttribute('value-unchecked');
    }
    const customEvent = new CustomEvent('switch-change', {
      bubbles: true,
      composed: true,
      detail: {
        name: this.getAttribute('name'),
        value: this.checkbox.value,
      },
    });
    this.dispatchEvent(customEvent);
  }

  connectedCallback() {
    this.span.textContent = this.getAttribute('value-unchecked');
    this.checkbox.setAttribute('type', 'checkbox');
    this.append(this.span, this.checkbox);
  }
}

export default SwitchButton;
