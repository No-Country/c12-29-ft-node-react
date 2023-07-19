import { Request,Response } from "express";
import { deleteImage, uploadImage } from "../libs/cloudinary";
import fs from 'fs-extra'
import Client from '../models/Client'
import Lawyer from "../models/Lawyer";

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
		const lawyer = await Lawyer.findById(_id)
		
		return res.status(200).json(client || lawyer)
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

export const updateClientImage = async (req: Request, res: Response) => {
	const {_id} = req.params
	const {imageId} = req.body
	try {
		if (imageId) {
			console.log(imageId);
			
			await deleteImage(imageId.toString())
			const client = await Client.findByIdAndUpdate(_id, {image: {}}, {new: true})
			return res.status(200).json(client)
		}	
		const file = req.files?.image
		let image 
		//upload image
		if(req.files?.image){
			const uploadedFile = Array.isArray(file)
			? file[0]
			: file;
			
			const tempFilePath = uploadedFile?.tempFilePath as string;
			const {public_id, secure_url} = await uploadImage(tempFilePath);
			image = {
				public_id,
				url: secure_url
			}
		//delete file
		await fs.remove(tempFilePath)
		//update client
		const client = await Client.findByIdAndUpdate(_id, {image}, {new: true})

			res.status(200).json(client);
		} else {
			throw new Error('Nonexistent image')
		}
	} catch (error) {
		return res.status(400).json(error)
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
