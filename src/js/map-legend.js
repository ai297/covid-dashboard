function numberToShortString(num) {
  if (num / 1000000 > 1) return `${+((num / 1000000).toFixed(1))}M`;
  if (num / 1000 > 10) return `${+((num / 1000).toFixed(1))}K`;
  return num.toFixed(0);
}

class MapLegend extends HTMLElement {
  updateLegend(color, minSize, ...values) {
    this.innerHTML = '';
    function createMarker(value, index) {
      const legendItem = document.createElement('div');
      const valRange = index > 0 ? `${numberToShortString(value)} - ${numberToShortString(values[index - 1])}` : `< ${numberToShortString(value)}`;
      legendItem.innerHTML = `
        <div style="width: ${(index + 1) * minSize}px; height: ${(index + 1) * minSize}px; background-color: ${color};"></div>
        <div>${valRange}</div>
      `;
      return legendItem;
    }
    const lastMarker = document.createElement('div');
    lastMarker.innerHTML = `
      <div style="width: ${(values.length + 1) * minSize}px; height: ${(values.length + 1) * minSize}px; background-color: ${color};"></div>
      <div>> ${numberToShortString(values[values.length - 1])}</div>
    `;
    this.append(lastMarker, ...values.map(createMarker).reverse());
  }
}
export default MapLegend;
