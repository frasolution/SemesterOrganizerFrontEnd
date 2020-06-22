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

export type EditColumnFormValues = {
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

export type ColumnType = {
  id: number;
  title: string;
  tasks: TaskType[];
};

export type TaskType = {
  id: number;
  title: string;
  description: string;
  dueDate: Date | null;
  priority: number | null;
  isCompleted: boolean;
};

export type TeamsRowData = Team & RowData;

export type CoursesRowData = Course & RowData & { id: number };
