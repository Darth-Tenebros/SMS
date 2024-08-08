
import { Student, createRow, findStudentIndex } from "./helper_functions/student.js";

const form = document.getElementById('form');
const fname = document.getElementById('fname-input');
const lname = document.getElementById('lname-input');
const mark = document.getElementById('mark-input');

const submitButton = document.getElementById('submit-student');
const searchField = document.getElementById('search');

const tableBody = document.getElementsByClassName("students-table")[0].getElementsByClassName("table-body")[0];



function onLoad(){
    Student.pouplateTable(tableBody);
}
document.addEventListener('DOMContentLoaded', onLoad);


function submit(){
    if(submitButton.value === ""){
        const student = new Student(fname.value, lname.value, mark.value);
        students.push(student);
        const row = createRow(student);

        tableBody.prepend(row)
        Student.write(student);
    }else{
        const id = submitButton.value;
        Student.updateStudent(id, fname.value, lname.value, mark.value);

        tableBody.innerHTML = '';
        Student.pouplateTable(tableBody);

    }
    submitButton.value = '';    
    form.reset();
}
submitButton.addEventListener('click', submit);

// EVENT DELEGATTION BECAUSE DYNAMICALLY ADDED ELEMENTS LOAD WEIRD - 84 HOURS WASTED
// TODO (EXTRA): event has been deprecated, FIGURE OUT HOW TO USE Event.
tableBody.addEventListener('click', function(event){
    const id = '';
    if([...event.target.classList].includes('delete-button')){
        id = event.target.value;
        Student.deleteStudent(id);
        tableBody.innerHTML = '';
        Student.pouplateTable(tableBody);
    }
    else if([...event.target.classList].includes('update-button')){
        id = event.target.value;

        const student = Student.formatReadStudent(localStorage.getItem(id));    
        fname.value = student.firstname;
        lname.value = student.lastname;
        mark.value = student.mark;
        submitButton.value = student.id;
    }
});


function search() {
    const input = document.getElementById('search');
    const filter = input.value.toUpperCase();
    const table = document.querySelector('.students-table');
    const tr = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those who don't match the search query
    for (let i = 1; i < tr.length; i++) { // Start from 1 to skip the header row
        const tdFirstName = tr[i].getElementsByTagName('td')[1];
        const tdLastName = tr[i].getElementsByTagName('td')[2];
        let showRow = false;

        if (tdFirstName) {
            const firstNameValue = tdFirstName.textContent || tdFirstName.innerText;
            if (firstNameValue.toUpperCase().indexOf(filter) > -1) {
                showRow = true;
            }
        }

        if (tdLastName) {
            const lastNameValue = tdLastName.textContent || tdLastName.innerText;
            if (lastNameValue.toUpperCase().indexOf(filter) > -1) {
                showRow = true;
            }
        }

        tr[i].style.display = showRow ? "" : "none";
    }
}
searchField.addEventListener('keyup', search);

// TODO: BUILD A SMOL GRAPHING UTILITY/LIB