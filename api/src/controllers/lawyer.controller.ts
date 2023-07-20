import { Request,Response } from "express";
import fs from 'fs-extra'
import Lawyer from '../models/Lawyer'
import { deleteImage, uploadImage } from "../libs/cloudinary";

export const getLawyers = async (req: Request,res: Response) => {
	const { name } = req.query;
	//Regex
	const query = {
		$or: [
			{ firstname: { $regex: name?.toString(),$options: 'i' } },
			{ lastname: { $regex: name?.toString(),$options: 'i' } },
		]
	}
	try {
		//Fetch Lawyers
		const result = await Lawyer.find(name ? query : {})
		res.status(200).json(result);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
}

export const getLawyerById = async (req: Request,res: Response) => {
	const { _id } = req.params

	try {
		//Fetch Lawyer
		const lawyer = await Lawyer.findById(_id)
		return res.status(200).json(lawyer)
	} catch (error) {

	}
}

export const updateLawyerData = async (req: Request,res: Response) => {
	const { _id } = req.params
	try {
		const updatedLawyer = await Lawyer.findByIdAndUpdate(_id,req.body)
		res.status(200).json(updatedLawyer);
	} catch (error: any) {
		console.log(error);
		res.status(400).json(error.message);
	}
}


export const updateLawyerImage = async (req: Request, res: Response) => {
	const {_id} = req.params
	const {imageId} = req.body
	/* console.log("req en API: ", req) */
	/* console.log("req.query en API: ", req.query) */
	/* console.log("req.params en API: ", req.params) */
	console.log("req.files en API: ", req.files)
	console.log("req.body en API: ", req.body)
	let checker = req.files? true:false
	const newImgObject = {
		name : checker
	}
	const obj = JSON.parse(JSON.stringify(req.files))
	console.log("OBJ: ", obj)
	console.log("OBJ.image,name: ", obj.image.name, "  ", typeof(obj.image.name))
	console.log("newImgObject: ", newImgObject, "  typeof: ", typeof(newImgObject), )
	console.log("CHECKER: ", checker)
	try {
		if (imageId) {
			console.log("imageId en try: ", imageId)
			await deleteImage(imageId.toString())
			const lawyer = await Lawyer.findByIdAndUpdate(_id, {image: {}}, {new: true})
/* 			console.log("lawyer en API: ", lawyer) */
			return res.status(200).json(lawyer)
		}		
		const file = req.files?.image
		let image 
		//upload image

		console.log("file en IF API: ", req.files)
		/* if(req.files?.image){ */
		console.log("CHECKER2: ", checker)
		if(obj.image.name){
        
			console.log("file en IF API: ", req.files?.image)//
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
		const lawyer = await Lawyer.findByIdAndUpdate(_id, {image}, {new: true})

			res.status(200).json(lawyer);
		} else {
			throw new Error('Nonexistent image')
		}
	} catch (error: any) {
		return res.status(400).json(error.message)
	}
}



// export const updateLawyerStatus = async (req: Request,res: Response) => {
// 	const { _id } = req.params
// 	const { status } = req.body
// 	try {
// 		const updatedLawyer = await Lawyer.findByIdAndUpdate(_id,{ status })
// 		res.status(200).json(updatedLawyer)
// 	} catch (error: any) {
// 		console.log(error);
// 		res.status(400).json(error.message)
// 	}
// }
