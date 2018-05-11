export class ProjectEmployees {
    employee: any;
    project: any;
    startDate: string;
    endDate: string;
    recordActive;

}












// const EmployeeProjectSchema = mongoose.Schema({
//     employee: {
//         type: Schema.Types.ObjectId,
//         ref: 'Employee'
//     },
//     project: {
//         type: Schema.Types.ObjectId,
//         ref: 'Project'
//     },
//     startDate: {
//         type: Date
//     },
//     endDate: {
//         type: Date
//     },
//     recordActive: {
//         type: Boolean,
//         default: true
//     }
// });