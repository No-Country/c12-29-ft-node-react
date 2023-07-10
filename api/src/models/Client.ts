import mongoose , { Schema,model,Document, Types } from 'mongoose'
export interface IClient extends Document {
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
	accountType: string
}

const ClientSchema = new Schema({
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
		default: 'Client'
	}
},{
	timestamps: true,
	versionKey: false
})
export default model<IClient>('Client',ClientSchema)