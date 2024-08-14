
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
     * calculates the number of people who scored in each range
     *
     * @returns {number[]}
     */
    #AggregateData(){
        let fail = 0;
        let fifties = 0;
        let sixties = 0;
        let seventies = 0;
        let eighties = 0;
        let ninties = 0;

        let ranges = []

        for (const barItem of this.barItems) {
            if(barItem.value < 50){
                fail++;
            }
            else if(barItem.value >= 50 && barItem.value <= 59){
                fifties++;
            }
            else if(barItem.value >= 60 && barItem.value <= 69){
                sixties++;
            }
            else if(barItem.value >= 70 && barItem.value <= 79){
                seventies++;
            }
            else if(barItem.value >= 80 && barItem.value <= 89){
                eighties++;
            }
            else if(barItem.value >= 90){
                ninties++;
            }
        }
        
        ranges.push(fail);
        ranges.push(fifties);
        ranges.push(sixties);
        ranges.push(seventies);
        ranges.push(eighties);
        ranges.push(ninties);

        return ranges;
    }

    #getMeasuresOfCentralTendency(){
        let mean, median, total = 0;
        let scores = []

        for (const item of this.barItems) {
            total += item.value;
            scores.push(item.value);
        }

        scores.sort(function(a, b){
            return a-b;
        });

        mean = total/this.barItems.length;

        const mid = Math.floor(scores.length/2)
        if(scores.length % 2 === 0){
            median = (scores[mid] + scores[mid - 1]) / 2
        }else{
            median = scores[mid];
        }

        return [mean, median]
    }


    /**
     * render this bar grapgh
     *
     * @param {HTMLDivElement} element: the svg element this graph will be displayed on
     */
    render(element){
        element.innerHTML = '';
        const graphFooter = document.getElementById('stats-footer');
        graphFooter.innerHTML = '';
        const ranges = this.#AggregateData();
        const [mean, median] = this.#getMeasuresOfCentralTendency();
        const parentHeight = document.getElementsByClassName('main-container')[0].clientHeight;
        const mark_ranges = ['0-49', '50-59', '60-69', '70-79', '80-89', '90+']

        for(let i = 0; i < ranges.length; i++){

            const barDiv = document.createElement('div');
            barDiv.classList.add('bar');
            const height = parentHeight * (ranges[i] / 100) * 5;
            barDiv.style.height = `${height}px`;
            barDiv.style.width = '80px';
            barDiv.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
            barDiv.title = `${mark_ranges[i]} - ${ranges[i]} students` ;

            element.appendChild(barDiv); 
        }

        const meanP = document.createElement('p');
        meanP.textContent = `MEAN: ${mean.toFixed(2)}`;
        const medianP = document.createElement('p');
        medianP.textContent = `MEDIAN: ${median.toFixed(2)}`;

        graphFooter.appendChild(meanP);
        graphFooter.appendChild(medianP);
        

    }
}