import { Injectable } from '@angular/core';
import { CommonServiceTask, DepartmentTask, Task } from '../interfaces';


@Injectable()
export class GanttService {
  loading: boolean = false; 
  idProject: string;

  collectionDepartmentTasks: DepartmentTask[] = [];
  collectionCommonServiceTask: CommonServiceTask[] = [];
  collectionTaskDepartment: Task[] = [];
  collectionTaskUnderground: Task[] = [];
  collectionTaskFloorSC: Task[] = [];
  collectionTaskEmplacement: Task[] = [];
  collectionGraphicFloor: any[] = [];
  collectionGraphicUnderground: any[] = [];
  collectionGraphicFloorSC: any[] = [];
  collectionGraphicEmplacement: any[] = [];

  constructor() { }

  cleanCollection(){
    this.collectionDepartmentTasks = [];
    this.collectionCommonServiceTask = [];
    this.collectionTaskDepartment = [];
    this.collectionTaskUnderground = [];
    this.collectionTaskFloorSC = [];
    this.collectionTaskEmplacement = [];
    this.collectionGraphicFloor = [];
    this.collectionGraphicUnderground = [];
    this.collectionGraphicFloorSC = [];
    this.collectionGraphicEmplacement = [];
  }


}