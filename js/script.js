
import { BarGraph, BarItem } from "./helper_functions/plot-monkey.js";
import { Student, createRow, bubbleSort } from "./helper_functions/student.js";

const form = document.getElementById('form');
const fname = document.getElementById('fname-input');
const lname = document.getElementById('lname-input');
const mark = document.getElementById('mark-input');

const graph = document.getElementById('graph');
const statsModal = document.getElementById('Stats');
const close = document.getElementById('close');
const modal = document.getElementById('modal');

const submitButton = document.getElementById('submit-student');
const searchField = document.getElementById('search');

const tableBody = document.getElementsByClassName("students-table")[0].getElementsByClassName("table-body")[0];


//TODO: CLEANUP FUNCTIONS
function onLoad(){
    Student.pouplateTable(tableBody);
    const table = document.querySelector('.students-table');
    const headers = table.querySelectorAll('.table-header');
    let isAscending = true;

    headers.forEach(function(header){
        header.addEventListener('click', function(){
            const column = header.textContent.trim();
            const columnIndex = Array.from(headers).indexOf(header);

            if (column === 'First Name' || column === 'Last name' || column === 'Mark') {
                sortTable(columnIndex);
            }

            isAscending = !isAscending;
        });
    });

    function sortTable(columnIndex) {
        const rows = Array.from(tableBody.querySelectorAll('tr'));
        const sortedRows = bubbleSort(rows, columnIndex, isAscending);
        tableBody.innerHTML = '';
        sortedRows.forEach(row => tableBody.appendChild(row));
    }
}
document.addEventListener('DOMContentLoaded', onLoad);


function submit(){
    if(submitButton.value === ""){
        const student = new Student(fname.value, lname.value, mark.value);
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
    submitButton.textContent = 'submit';
    submitButton.style.backgroundColor = '#4CAF50'
}
submitButton.addEventListener('click', submit);

// EVENT DELEGATTION BECAUSE DYNAMICALLY ADDED ELEMENTS LOAD WEIRD - 84 HOURS WASTED
// TODO (EXTRA): event has been deprecated, FIGURE OUT HOW TO USE Event.
tableBody.addEventListener('click', function(event){
    let id = '';
    if([...event.target.classList].includes('delete-button')){
        id = event.target.value;
        Student.deleteStudent(id);
        tableBody.innerHTML = '';
        Student.pouplateTable(tableBody);
    }
    else if([...event.target.classList].includes('update-button')){
        submitButton.textContent = 'updating';
        submitButton.style.backgroundColor = '#fffd8d'
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



statsModal.addEventListener('click', function(){
    modal.style.display = 'block';

    const students = Student.getAllStudents();

    let barItems = []
    for (const student of students) {
        barItems.push(new BarItem(student.lastname, Number(student.mark)));
    }


    const barGraph = new BarGraph(barItems);
    barGraph.render(graph);


});

close.addEventListener('click', function(){
    modal.style.display = 'none'; 
});


// TODO: BUILD A SMOL GRAPHING UTILITY/LIB

function downloadPage(){
    const lines = [];
    const students = Student.getAllStudents();

    for (let student of students) {
        student = student.toString();
        student = student.replaceAll('-', ',');
        lines.push(student);
    }

    
    const blob = new Blob([lines.join('\n')], {type: 'text/csv'})
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.click();
    a.target = '_blank';
    
}
document.querySelector('#download').addEventListener('click', downloadPage);