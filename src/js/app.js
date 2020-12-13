import AppMain from './app-main';

class App {
    mount(element) {
        this.element = element;
        this.render();
    }

    render() {
        this.element.innerHTML = 'Hello world';
    }
}

customElements.define('app-main', AppMain);
export default App;
