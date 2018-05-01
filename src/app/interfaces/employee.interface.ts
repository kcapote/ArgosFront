export interface Employee {
    _id?: string;
    rut: string;
    name: string;
    lastName: string;
    position: string;    

}



// const EmployeeSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, "El nombre del empleado es necesario"]
//     },
//     lastName: {
//         type: String,
//         required: [true, "El apellido del empleado es necesario"]
//     },
//     position: {
//         type: Schema.Types.ObjectId,
//         ref: 'Position'
//     }

// });