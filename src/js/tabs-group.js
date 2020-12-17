class TabsGroup extends HTMLElement {
  connectedCallback() {
    [...this.children].forEach((elem) => elem.setAttribute('name', this.getAttribute('name')));
  }
}

export default TabsGroup;
