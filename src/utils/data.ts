type Course = {
  id: number;
  courseNumber: number;
  courseTitle: string;
  courseCP: number;
};

export const courses: Course[] = [
  { id: 1, courseNumber: 1, courseTitle: "Algebra", courseCP: 5 },
  { id: 1, courseNumber: 2, courseTitle: "Analysis", courseCP: 5 },
  { id: 1, courseNumber: 3, courseTitle: "Einführung in die Informatik", courseCP: 5 },
  {
    id: 1,
    courseNumber: 4,
    courseTitle: "Einführung in die Programmierung mit C und OOP Grundlagen",
    courseCP: 15,
  },
  { id: 2, courseNumber: 5, courseTitle: "BWL", courseCP: 5 },
  { id: 3, courseNumber: 6, courseTitle: "English", courseCP: 5 },
  { id: 4, courseNumber: 7, courseTitle: "Diskrete Mathematik", courseCP: 5 },
  { id: 5, courseNumber: 8, courseTitle: "Rechnerarchitekturen", courseCP: 5 },
  { id: 6, courseNumber: 9, courseTitle: "Algorithmen und Datenstrukturen", courseCP: 5 },
  { id: 7, courseNumber: 10, courseTitle: "Theoretische Informatik", courseCP: 5 },
  { id: 8, courseNumber: 11, courseTitle: "Software Engineering - Analysis", courseCP: 5 },
  { id: 9, courseNumber: 12, courseTitle: "Statistics", courseCP: 5 },
  { id: 10, courseNumber: 13, courseTitle: "OOP Programming in Java", courseCP: 5 },
  { id: 11, courseNumber: 14, courseTitle: "Databases", courseCP: 5 },
  { id: 12, courseNumber: 15, courseTitle: "Computer Networks", courseCP: 5 },
  { id: 13, courseNumber: 16, courseTitle: "Operating Systems", courseCP: 5 },
  { id: 14, courseNumber: 17, courseTitle: "Software Engineering - Design", courseCP: 5 },
  { id: 15, courseNumber: 18, courseTitle: "Real-Time Systems", courseCP: 5 },
  { id: 16, courseNumber: 19, courseTitle: "IT Security", courseCP: 5 },
  { id: 17, courseNumber: 20, courseTitle: "Distributed Systems", courseCP: 5 },
  {
    id: 18,
    courseNumber: 21,
    courseTitle: "Practical Computer Networks and Applications",
    courseCP: 5,
  },
  { id: 19, courseNumber: 22, courseTitle: "Programming Exercises", courseCP: 5 },
  { id: 20, courseNumber: 23, courseTitle: "Recht und Datenschutz", courseCP: 5 },
  { id: 21, courseNumber: 24, courseTitle: "Aktuelle Themen der Informatik", courseCP: 5 },
  { id: 22, courseNumber: 25, courseTitle: "Informatik-Projekt", courseCP: 10 },
  { id: 23, courseNumber: 26, courseTitle: "Wahlpflichtmodul", courseCP: 5 },
  { id: 24, courseNumber: 27, courseTitle: "Interdisziplinäres Studium Generale", courseCP: 5 },
  { id: 25, courseNumber: 28, courseTitle: "Praxisphase", courseCP: 18 },
  { id: 26, courseNumber: 29, courseTitle: "Bachelor-Arbeit mit Kolloquium", courseCP: 12 },
];
