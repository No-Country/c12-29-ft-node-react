import { Schema,model,Document, Types } from 'mongoose'
import {ISubscription} from './Subscription'
export interface ILawyer extends Document {
	firstname: string
	lastname: string
	image: {
		url: string,
		public_id: string
	}
	email: string
	hashedPassword: string
	meets: [Types.ObjectId]
	isActive: boolean
	isAuthorized: boolean
	subscription: ISubscription
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
	license: {
		type: String,
		required: true
	},
	meets: [{
		type: Schema.Types.ObjectId,
		ref: 'Meet'
	}],
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
		type: Schema.Types.Mixed,
		default: {
			name: 'free',
			price: 0,
			meets: 3,
			jurisdictions: 1,
			specialities: 2,
			visibility: 10
		}
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