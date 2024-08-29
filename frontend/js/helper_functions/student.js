export class Student{

    #firstname = ''
    #lastname = ''
    #mark = ''
    #Id
    /**
     * Creates an instance of Student.
     *
     * @constructor
     * @param {string} firstname: firstname of this student
     * @param {string} lastname: lastname of this student
     * @param {number} mark: current mark of this student
     */
    constructor(firstname, lastname, mark){
        this.#Id =  Math.floor(Math.random() * Date.now()).toString().slice(0, 4);
        this.#firstname = firstname;
        this.#lastname = lastname;
        this.#mark = mark;
    }

    get id(){
        return this.#Id;
    }

    get firstname(){
        return this.#firstname;
    }

    get lastname(){
        return this.#lastname;
    }

    get mark(){
        return this.#mark;
    }

    /**
     * updates the name of this student
     *
     * @param {string} newName: the updated first name of this student
     */
    set firstname(newName){
        this.#firstname = newName;
    }

    /**
     * updates the name of this student
     *
     * @param {string} newName: the updated last name of this student
     */
    set lastname(newName){
        this.#lastname = newName;
    }

    /**
     * updates the mark of this student
     *
     * @param {number} mnewMark: the new mark of this student
     */
    set mark(newMark){
        this.#mark = newMark;
    }


    /**
     * returns a string representation of this object
     * @override
     * @returns {string}
     */
    toString(){
        return `${this.id}-${this.firstname}-${this.lastname}-${this.mark}`;
    }


    /**
     * writes this object to local storage.
     *
     * @static
     * @param {Student} obj
     */
    static write(obj){
        localStorage.setItem(obj.id, obj.toString());
    }

    static formatReadStudent(studentString){
        if(studentString.indexOf(',') > -1){
            studentString = studentString.replaceAll(',', '-')
        }
        const attributes = studentString.split('-');
        const student = new Student(attributes[1], attributes[2], attributes[3]);
        student.#Id = attributes[0];    
        return student;
    }

    static pouplateTable(element){
        for(let [_, value] of Object.entries(localStorage)){
            const row = createRow(Student.formatReadStudent(value))
            element.appendChild(row);
        }
    }

    static getAllStudents(){
        let students = [];

        for(let [_, value] of Object.entries(localStorage)){
            students.push(Student.formatReadStudent(value));
        }

        return students
    }

    static updateStudent(id, fname, lname, mark){
        const student = new Student(fname, lname, mark);
        student.#Id = id;
        Student.write(student);
    }

    static deleteStudent(id){
        localStorage.removeItem(id);
    }

    static formatStudentsToCSV(){
        const lines = [];
        let students = this.getAllStudents();

        for (let student of students) {
            student = student.toString();
            student = student.replaceAll('-', ',');
            lines.push(student);
        }

        const blob = new Blob([lines.join('\n')], {type: 'text/csv'})
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'students.csv';
        a.click();
    }
}


/**
 * function createRow takes a student param and constructs an html element for 
 * the given student
 *
 * @param {Student} student
 * @returns {HTMLTableRowElement}
 */
export function createRow(student){

    const row = document.createElement('tr');
    row.classList.add('data-row');

    // setup table data
    const tdId = document.createElement('td');
    tdId.classList.add('data');
    const tdFirstName = document.createElement('td');
    tdFirstName.classList.add('data');
    const tdLastName = document.createElement('td');
    tdLastName.classList.add('data');
    const tdMark = document.createElement('td');
    tdMark.classList.add('data');

    tdId.textContent = student.id;
    tdFirstName.textContent = student.firstname;
    tdLastName.textContent = student.lastname;
    tdMark.textContent = student.mark;

    // select and options
    const tdDiv = document.createElement('div')
    tdDiv.classList.add('student-actions');

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'delete';
    deleteButton.classList.add('delete-button');
    deleteButton.value = student.id;

    const updateButton = document.createElement('button');
    updateButton.type = 'button';
    updateButton.textContent = 'update';
    updateButton.classList.add('update-button');
    updateButton.value = student.id;

    tdDiv.appendChild(deleteButton);
    tdDiv.appendChild(updateButton);
    //

    row.appendChild(tdId);
    row.appendChild(tdFirstName);
    row.appendChild(tdLastName);
    row.appendChild(tdMark);
    row.appendChild(tdDiv);

    return row;
}


/**
 * function bubblesort sorts a given array based on the given isAscending criteria
 *
 * @param {HTMLTableRowElement[]} arr
 * @param {number} columnIndex
 * @param {boolean} isAscending
 * @returns {HTMLTableRowElement[]}
 */
export function bubbleSort(arr, columnIndex, isAscending) {
    const length = arr.length;

    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            const cellA = arr[j].children[columnIndex].textContent.trim();
            const cellB = arr[j + 1].children[columnIndex].textContent.trim();

            let comparison = 0;

            // column 3 has the marks (number)
            if (columnIndex === 3) {
                comparison = parseFloat(cellA) - parseFloat(cellB);
            } else {
                comparison = cellA.localeCompare(cellB);
            }
            
            // if we're asc
            if (isAscending) {
                // and comparator is > 0
                if (comparison > 0) {
                    // the bigger item j is swapped with the smaller item j+1
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            } else {
                if (comparison < 0) {
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    return arr;
}