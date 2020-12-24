class MapLegend extends HTMLElement {
  updateLegend(color, minSize, ...values) {
    this.innerHTML = '';
    function createMarker(value, index) {
      const legendItem = document.createElement('div');
      const valRange = index > 0 ? `${value.toFixed(0)} - ${values[index - 1].toFixed(0)}` : `< ${value.toFixed(0)}`;
      legendItem.innerHTML = `
        <div style="width: ${(index + 1) * minSize}px; height: ${(index + 1) * minSize}px; background-color: ${color};"></div>
        <div>${valRange}</div>
      `;
      return legendItem;
    }
    const lastMarker = document.createElement('div');
    lastMarker.innerHTML = `
      <div style="width: ${(values.length + 1) * minSize}px; height: ${(values.length + 1) * minSize}px; background-color: ${color};"></div>
      <div>> ${values[values.length - 1].toFixed(0)}</div>
    `;
    this.append(lastMarker, ...values.map(createMarker).reverse());
  }
}
export default MapLegend;
