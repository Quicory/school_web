import { Classroom } from './classroom/classroom'; //'src/interfaces/classroom/classroom';

export interface AssignClassroom {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  profession: string;
  create_at?: Date;
  update_at?: Date;
  classrooms: Classroom[];
}
