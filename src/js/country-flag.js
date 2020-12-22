import FLAGS from './flags';

class CountryFlag extends HTMLElement {
  constructor(country) {
    super();
    if (country) this.country = country;
    this.style.backgroundImage = 'url("./flags.png")';
    this.style.backgroundSize = `${FLAGS.sprite.cols * 100}% ${FLAGS.sprite.rows * 100}%`;
  }

  get country() {
    return this.getAttribute('country');
  }

  set country(val) {
    this.setAttribute('country', val);
    const countryIndex = FLAGS.countries.indexOf(val);
    if (countryIndex >= 0) {
      const col = countryIndex % FLAGS.sprite.cols;
      const row = Math.floor(countryIndex / FLAGS.sprite.cols);
      this.style.backgroundPosition = `${col * (100 / (FLAGS.sprite.cols - 1))}% ${row * (100 / (FLAGS.sprite.rows - 1))}%`;
    } else {
      this.style.backgroundPosition = '100% 100%';
    }
  }

  static get observedAttributes() {
    return ['country'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) this[name] = newValue;
  }
}
export default CountryFlag;
