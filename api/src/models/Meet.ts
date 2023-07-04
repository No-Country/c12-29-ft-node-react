import { Schema,model,Document } from 'mongoose'


export interface IMeet extends Document {
	client: string
	lawyer: string
	date: Date
}


const MeetSchema = new Schema({
	client: {
		type: Schema.Types.ObjectId,
		required: true
	},
	lawyer: {
		type: Schema.Types.ObjectId,
		required: true
	},
	date: {
		type: Date,
		required: true
	}
},{
	timestamps:true,
	versionKey: false
})

export default model('Meet', MeetSchema)