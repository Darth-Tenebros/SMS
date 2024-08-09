import { Student } from "./helper_functions/student";


function seedStudents() {
    const students = [
        new Student("Tom", "Cat", 56),
        new Student("Jerry", "Mouse", 85),
        new Student("Scooby", "Doo", 72),
        new Student("Shaggy", "Rogers", 81),
        new Student("Fred", "Flintstone", 88),
        new Student("Homer", "Simpson", 76),
        new Student("Marge", "Simpson", 43),
        new Student("Sakura", "Haruno", 89),
        new Student("Yuji", "Himtadori", 95),
        new Student("Vegeta", "Prince", 34),
        new Student("Luffy", "Monkey D.", 84),
        new Student("Zoro", "Roronoa", 93),
        new Student("Ash", "Ketchum", 8),
        new Student("Misty", "Waterflower", 86),
        new Student("Light", "Yagami", 92),
        new Student("L", "Lawliet", 91),
        new Student("Yugi", "Mutou", 23),
        new Student("Kaiba", "Seto", 54),
        new Student("Sailor", "Moon", 87),
        new Student("Rei", "Ayanami", 90),
        new Student("Inuyasha", "Takahashi", 85),
        new Student("Kagome", "Higurashi", 89),
        new Student("Spike", "Spiegel", 67),
        new Student("Jet", "Black", 83),
        new Student("Edward", "Elric", 27),
        new Student("Alphonse", "Elric", 91),
        new Student("Bulma", "Briefs", 23),
        new Student("Nami", "Bellmère", 21),
        new Student("Chihiro", "Ogino", 82),
        new Student("Totoro", "Forest", 12),
    ];

    students.forEach(student => {
        Student.write(student);
    });
}
seedStudents();
