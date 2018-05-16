import { CommonService } from './common-services.interface';
import { Task } from './task.interface';
import { SubTask } from './subTask.interface';
import { Project } from './project.interface';

import { ValidTypesTasks } from '../enums/valid-types-tasks.enum';

export interface CommonServiceSubTask {
    _id?: string;
    commonService: any;
    subTask: any;
    task: any;
    type: any;
    project: any;
    createDate?: string;
    updateDate?: string;
    endDate?: string;
    status: Number;
    recordActive?: String;
}
