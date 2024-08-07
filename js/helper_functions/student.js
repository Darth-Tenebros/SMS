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
        this.#Id =  Math.floor(Math.random() * Date.now()).toString();
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

    // select and options
    const tdDiv = document.createElement('div')
    tdDiv.classList.add('student-actions');

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'delete';
    deleteButton.classList.add('table-action');

    const updateButton = document.createElement('button');
    updateButton.type = 'button';
    updateButton.textContent = 'update';
    updateButton.classList.add('table-action');

    


    tdDiv.appendChild(deleteButton);
    tdDiv.appendChild(updateButton);

    //

    tdId.textContent = student.id.slice(0, 4);
    tdFirstName.textContent = student.firstname;
    tdLastName.textContent = student.lastname;
    tdMark.textContent = student.mark;

    console.log(tdFirstName.textContent);

    row.appendChild(tdId);
    row.appendChild(tdFirstName);
    row.appendChild(tdLastName);
    row.appendChild(tdMark);
    row.appendChild(tdDiv);

    return row;
}