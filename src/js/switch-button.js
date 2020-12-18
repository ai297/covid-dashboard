class SwitchButton extends HTMLLabelElement {
  constructor() {
    super();
    this.span = document.createElement('span');
    this.checkbox = document.createElement('input');
  }

  render() {
    this.span.textContent = this.getAttribute('value-unchecked');
    this.checkbox.setAttribute('type', 'checkbox');
    this.checkbox.addEventListener('change', (e) => {
      e.stopPropagation();
      this.handlerChange();
    });
    this.append(this.span, this.checkbox);
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
    this.render();
  }
}

customElements.define('switch-btn', SwitchButton, { extends: 'label' });

export default SwitchButton;
