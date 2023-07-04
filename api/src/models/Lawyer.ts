import { Schema,model,Document } from 'mongoose'

export interface ILawyer extends Document {
	firstname: string
	lastname: string
	image: {
		url: string,
		public_id: string
	}
	email: string
	hashedPassword: string
	isActive: boolean
	isAuthorized: boolean
	subscription: string
	specialities: [string]
}

const LawyerSchema = new Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	image: {
		url: String,
		public_id: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	isActive: {
		type: Boolean,
		default: true
	},
	accountType: {
		type: String,
		default: 'Lawyer'
	},
	isAuthorized: {
		type: Boolean,
		default: false
	},
	subscription: {
		type: String,
		default: "free"
	},
	specialities: [{
		type: String,
		required: true
	}]
},{
	timestamps: true,
	versionKey: false
})
export default model<ILawyer>('Lawyer',LawyerSchema)