import EVENTS from './events';

class TabsGroup extends HTMLElement {
  constructor() {
    super();
    window.addEventListener(EVENTS.UI.tabChange, (event) => {
      const checkedElem = [...this.children].find((elem) => elem.getAttribute('value') === event.detail.value);
      checkedElem.inputElement.checked = true;
    });
  }

  connectedCallback() {
    setTimeout([...this.children].forEach((elem) => elem.setAttribute('name', this.getAttribute('name'))), 0);
  }
}

export default TabsGroup;
