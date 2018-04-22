import { SubTask } from './subTask.interface';
import { ValidTypesTasks } from '../enums/valid-types-tasks.enum';

export interface Task {
    _id?: string;
    name: string;
    description?: string;
    subTask: SubTask[];
    type: ValidTypesTasks;
}