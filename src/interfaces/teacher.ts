import { Subject } from './subject';

export interface Teacher {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  profession: string;
  subjects: Subject[];
}
