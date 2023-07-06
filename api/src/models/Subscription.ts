import {Schema, model, Document} from 'mongoose'

export interface ISubscription extends Document{
	name: string
	price: number
	meets: number
	jurisdictions: number
	specialities: number
	visibility: number
}

const SubscriptionSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	price: {
		type: Number,
		required: true
	},
	meets: {
		type: Number,
		required:true
	},
	jurisdictions: {
		type: Number,
		required: true
	},
	specialities: {
		type: Number,
		required: true
	},
	visibility: {
		type: Number,
		required: true
	}
},{
	timestamps:false,
	versionKey: false
})

export default model<ISubscription>('Subscription', SubscriptionSchema)