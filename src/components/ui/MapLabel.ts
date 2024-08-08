export class LabelOverlay extends google.maps.OverlayView {
    constructor(position, text, map) {
        super();
        this.position = position;
        this.text = text;
        this.div = null;
        this.setMap(map);
    }

    onAdd() {
        this.div = document.createElement('div');
        this.div.style.position = 'absolute';
        this.div.style.backgroundColor = 'white';
        this.div.style.border = '1px solid black';
        this.div.style.padding = '2px';
        this.div.style.fontSize = '12px';
        this.div.innerText = this.text;

        const panes = this.getPanes();
        panes.overlayLayer.appendChild(this.div);
    }

    draw() {
        const overlayProjection = this.getProjection();
        const position = overlayProjection.fromLatLngToDivPixel(this.position);

        if (this.div) {
            this.div.style.left = `${position.x}px`;
            this.div.style.top = `${position.y}px`;
        }
    }

    onRemove() {
        if (this.div) {
            this.div.parentNode.removeChild(this.div);
            this.div = null;
        }
    }
}