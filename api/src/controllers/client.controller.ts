import { Request,Response } from "express";
import Client from '../models/Client'

export const getClients = async (req: Request,res: Response) => {
	const { name } = req.query;
	//Regex
	const query = {
		$or: [
			{ firstname: { $regex: name?.toString(),$options: 'i' } },
			{ lastname: { $regex: name?.toString(),$options: 'i' } },
		]
	}
	try {
		//Fetch clients
		const result = await Client.find(name ? query : {})
		res.status(200).json(result);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
}

export const getClientById = async (req: Request,res: Response) => {
	const { _id } = req.params

	try {
		//Fetch client
		const client = await Client.findById(_id)
		return res.status(200).json(client)
	} catch (error) {

	}
}

export const updateClientData = async (req: Request,res: Response) => {
	const { _id } = req.params
	try {
		const updatedClient = await Client.findByIdAndUpdate(_id,req.body)
		res.status(200).json(updatedClient);
	} catch (error: any) {
		console.log(error);
		res.status(400).json(error.message);
	}
}

// export const updateClientStatus = async (req: Request,res: Response) => {
// 	const { _id } = req.params
// 	const { status } = req.body
// 	try {
// 		const updatedClient = await Client.findByIdAndUpdate(_id,{ status })
// 		res.status(200).json(updatedClient)
// 	} catch (error: any) {
// 		console.log(error);
// 		res.status(400).json(error.message)
// 	}
// }
