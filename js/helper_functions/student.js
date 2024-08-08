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
     * @param {string} id
     */
    set #id(id){
        this.#Id = id;
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
 * finds a student in an array and returns the index
 *
 * @param {number} id
 * @param {array} arr
 * @returns {number}
 */
export function findStudentIndex(id, arr){
    let index = -1;

    for(let i = 0; i < arr.length; i++){
        if(arr[i].id === id){
            index = i;
            break;
        }
    }

    return index;
}