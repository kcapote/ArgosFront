
export interface Project {
    _id?: string;
    name: string;
    adress: string;
    builder: string;
    supervisor1: string;
    supervisor2: string;
    status: number;
    startDate: Date;
    endDate: Date;
}


// const ProjectSchema = mongoose.Schema({
//     name: {
//         type: String,
//         rEmployeeequired: [true, "El nombre de la obra es necesario"]
//     },
//     adress: {
//         type: String,
//         required: [true, "La dirección de la obra es necesario"]
//     },
//     builder: {
//         type: String,
//         required: [true, "La constructora de la obra es necesaria"]
//     },
//     supervisor1: {
//         type: Schema.Types.ObjectId,
//         ref: 'Employee',
//         required: [true, "El supervidor 1 de la obra es necesario"]
//     },
//     supervisor2: {
//         type: Schema.Types.ObjectId,
//         ref: 'Employee',
//         required: [true, "El supervidor 2 de la obra es necesario"]
//     },
//     status: {
//         type: Number
//     },
//     startDate: {
//         type: Date
//     },
//     endDate: {
//         type: Date
//     }
// });
