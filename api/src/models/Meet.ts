import { Schema,model,Document } from 'mongoose'


export interface IMeet extends Document {
	client: string
	lawyer: string
	date: Date
	status: string
}


const MeetSchema = new Schema({
	clientId: {
		ref: 'Client',
		type: Schema.Types.ObjectId,
		required: true
	},
	lawyerId: {
		ref: 'Lawyer',
		type: Schema.Types.ObjectId,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	status: {
		type: String,
		default: 'Pendiente'
	}
},{
	timestamps:true,
	versionKey: false
})

export default model('Meet', MeetSchema)