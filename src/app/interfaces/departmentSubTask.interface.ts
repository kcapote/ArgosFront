import { Department } from './department.interface';
import { SubTask } from './subTask.interface';
import { Task } from './task.interface';
import { Floors } from './floors.interface';
import { Project } from './project.interface';

import { ValidTypesTasks } from '../enums/valid-types-tasks.enum';

export interface DepartmentSubTask {
    _id?: string;
    department: any;
    subTask: any;
    task: any;
    floor: any;
    project: any;
    startDate?: string;
    updateDate?: string;
    endDate?: string;
    status: Number;
}