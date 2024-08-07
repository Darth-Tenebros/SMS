
import { Student, createRow, findStudentIndex } from "./helper_functions/student.js";

const form = document.getElementById('form');
const fname = document.getElementById('fname-input');
const lname = document.getElementById('lname-input');
const mark = document.getElementById('mark-input');

const submitButton = document.getElementById('submit-student');

const tableBody = document.getElementsByClassName("students-table")[0].getElementsByClassName("table-body")[0];

const students = [
    new Student("John", "Doe", 47),
    new Student("Jane", "Doe", 89),
    new Student("Patrick", "Star", 23),
    new Student("Spongebob", "Squarepants", 23),
    new Student("Gumball", "Waterson", 50),
    new Student("Morty", "Smith", 67),
    new Student("Tim", "Cook", 2),

];


function onLoad(){

    for (const student of students) {
        const row = createRow(student);
        tableBody.appendChild(row);
    }
}
document.addEventListener('DOMContentLoaded', onLoad);


function submit(){
    if(submitButton.value === ""){
        const student = new Student(fname.value, lname.value, mark.value);
        students.push(student);
        const row = createRow(student);

        tableBody.prepend(row)
    }else{
        const id = submitButton.value;
        
        const index = findStudentIndex(id, students);
        if(index > -1){
            students[index].firstname = fname.value;
            students[index].lastname = lname.value;
            students[index].mark = mark.value;
        }

        tableBody.innerHTML = '';
        for (const student of students) {
            const row = createRow(student);
            tableBody.appendChild(row);
        }

    }

    form.reset();
}
submitButton.addEventListener('click', submit);

// EVENT DELEGATTION BECAUSE DYNAMICALLY ADDED ELEMENTS LOAD WEIRD - 84 HOURS WASTED
tableBody.addEventListener('click', function(event){
    if([...event.target.classList].includes('delete-button')){
        const id = event.target.value;

        const index = findStudentIndex(id, students);
        if(index > -1){
            students.splice(index, 1);
        }

        tableBody.innerHTML = '';
        for (const student of students) {
            const row = createRow(student);
            tableBody.appendChild(row);
        }
    }
    else if([...event.target.classList].includes('update-button')){
        const id = event.target.value;

        const index = findStudentIndex(id, students);
        if(index > -1){
            const student = students[index];
            fname.value = student.firstname;
            lname.value = student.lastname;
            mark.value = student.mark;
            submitButton.value = student.id;
        }
    }
});
