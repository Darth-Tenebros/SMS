
/**
 * class BarItem represents a single data poinbt for a bar graph
 *
 * @export
 * @class BarItem
 * @typedef {BarItem}
 */
export class BarItem{
    
    /**
     * Creates an instance of BarItem.
     *
     * @constructor
     * @param {string} key: the key for this data point
     * @param {number} value: the value for this data point
     */
    constructor(key, value){
        this.key = key;
        this.value = value;
    }
}


export class BarGraph{

    /**
     * Creates an instance of BarGraph.
     *
     * @constructor
     * @param {BarItem[]} barItems: an array of bar items that make up this bar graph
     */
    constructor(barItems){
        this.barItems = barItems
    }


    /**
     * render this bar grapgh
     *
     * @param {SVGElement} element: the svg element this graph will be displayed on
     */
    render(element){
        let start = 3;
        const spacebetween = 37;

        for(let i = 0; i < this.barItems.length; i++){
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('y', '50');

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'title');

            const height = 100 * (this.barItems[i].value / 100);
            rect.setAttribute('height', `${height}px`);
            rect.setAttribute('width', '30px');
            rect.setAttribute('x', `${start}px`);
            rect.setAttribute('fill', 'red');
            rect.appendChild(text);

            rect.addEventListener('mouseover', (e) => {
                const tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                tooltip.setAttribute('x', e.target.getAttribute('x'));
                tooltip.setAttribute('y', e.target.getAttribute('y') - 10);
                tooltip.setAttribute('fill', 'white');
                tooltip.textContent = `${this.barItems[i].key} - ${this.barItems[i].value}%`;
                // tooltip.style.transform = 'rotateX(180deg)';
                tooltip.classList.add('tooltip');
                element.appendChild(tooltip);
            });

            rect.addEventListener('mouseout', () => {
                const tooltips = document.querySelectorAll('.tooltip');
                tooltips.forEach(tooltip => tooltip.remove());
            });

            start += spacebetween;

            element.appendChild(rect);
        }
        

    }
}