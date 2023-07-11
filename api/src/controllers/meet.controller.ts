import { Request, Response } from "express";
import Meet from "../models/Meet";
import Client from "../models/Client";
import Lawyer from "../models/Lawyer";

export const getUserMeets = async (req:Request,res:Response) => {
	const {userId} = req.params
	const {isClient} = req.query
	try {
		const userMeets = isClient ? await Client.findById(userId).populate('meets') : await Lawyer.findById(userId).populate('meets')
		return res.status(200).json(userMeets?.meets)
	} catch (error) {
		console.log(error);
		

		return res.status(400).json(error)
	}

}

export const createMeet = async (req:Request,res:Response) => {
	const {clientId} = req.params
	const {lawyerId, date} = req.body
	try {
		//new meet
		const newMeet = new Meet({clientId, lawyerId, date})
		//find users
		const client = await Client.findById(clientId)
		const lawyer = await Lawyer.findById(lawyerId)
		//save meet
		if (client && lawyer) {
			newMeet.save()
			client?.meets.push(newMeet._id)
			lawyer?.meets.push(newMeet._id)
			client.save()
			lawyer.save()
		} else {
			throw new Error('Nonexistent user')
		}

		return res.status(201).json(newMeet)
	} catch (error) {
		console.log(error);
		return res.status(400).json(error)
	}
}