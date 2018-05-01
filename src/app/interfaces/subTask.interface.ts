import { ValidTypesTasks } from '../enums/valid-types-tasks.enum';
import { Task } from './task.interface';

export interface SubTask {
    _id?: string;
    taskId: string;
    name: string;
    position: number;
    task?: Task;

}