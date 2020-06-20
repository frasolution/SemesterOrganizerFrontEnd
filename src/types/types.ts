type RowData = {
  tableData: any;
};

export type SignUpFormValues = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormValues = {
  username: string;
  password: string;
};

export type EditTeamFormValues = {
  teamName: string;
};

export type EditCourseFormValues = {
  courseName: string;
};

export type CreateColumnFormValues = {
  columnName: string;
};

export type Team = {
  id: number;
  name: string;
};

export type Course = {
  courseNumber: number;
  courseName: string;
  courseSemester: number;
  courseCP: number;
};

export type TeamsRowData = Team & RowData;

export type CoursesRowData = Course & RowData & { id: number };
