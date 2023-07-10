import {Schema, model, Document} from 'mongoose'


export interface ISpeciality extends Document {
	name: string
}

const SpecialitySchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	}
},{
	timestamps:false,
	versionKey: false
})

export default model<ISpeciality>('Speciality', SpecialitySchema)