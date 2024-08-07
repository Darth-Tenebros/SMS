
import { Student, createRow } from "./Student.js";

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
    const student = new Student(fname.value, lname.value, mark.value);
    students.push(student);
    const row = createRow(student);

    tableBody.appendChild(row);

    fname.value = '';
    lname.value = '';
    mark.value = '';
}
submitButton.addEventListener('click', submit);
