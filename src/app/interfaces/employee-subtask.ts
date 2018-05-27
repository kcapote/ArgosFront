
export interface  EmployeeSubTask {
    employee: any;
    subTask: any;
    task: any;
    floor?: any;
    department?: any;
    commonService?: any;
    project: any;
    recordDate: string;
    hoursWorked: number;
}


// const EmployeeSubTaskSchema = mongoose.Schema({
//     employee: {
//         type: Schema.Types.ObjectId,
//         ref: 'Employee',
//         index: true
//     },
//     subTask: {
//         type: Schema.Types.ObjectId,
//         ref: 'SubTask'
//     },
//     task: {
//         type: Schema.Types.ObjectId,
//         ref: 'Task'
//     },
//     floor: {
//         type: Schema.Types.ObjectId,
//         ref: 'Floor'
//     },
//     department: {
//         type: Schema.Types.ObjectId,
//         ref: 'Department'
//     },
//     commonService: {
//         type: Schema.Types.ObjectId,
//         ref: 'CommonService'
//     },
//     project: {
//         type: Schema.Types.ObjectId,
//         ref: 'Project',
//         index: true
//     },
//     recordDate: {
//         type: Date
//     },
//     hoursWorked: {
//         type: Number
//     },
//     recordActive: {
//         type: Boolean,
//         default: true
//     }
// });