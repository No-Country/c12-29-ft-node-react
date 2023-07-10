import { Request,Response } from "express"
import Subscription from "../models/Subscription"

export const getSubscriptions = async (req: Request,res: Response) => {
	try {
		const allSubscriptions = await Subscription.find()

		return res.status(200).json(allSubscriptions)
	} catch (error) {
		console.log(error);
		
		return res.status(400).json(error)
	}
}
export const createSubscription = async (req: Request,res: Response) => {
	try {
		const newSubscription = new Subscription(req.body)
		await newSubscription.save()

		return res.status(200).json(newSubscription)
	} catch (error) {

		return res.status(400).json(error)
	}
}
export const updateSubscription = async (req: Request,res: Response) => {
	const { _id } = req.params
	try {
		const updatedSubscription = await Subscription.findByIdAndUpdate(_id,req.body,{new: true})
		return res.status(200).json(updatedSubscription)

	} catch (error) {
		return res.status(400).json(error)
	}
}
export const deleteSubscription = async (req: Request,res: Response) => {
	const { _id } = req.params
	try {
		await Subscription.findByIdAndDelete(_id)
		return res.status(200).json('Suscripción borrada correctamente')
	} catch (error) {
		return res.status(400).json(error)
	}
}