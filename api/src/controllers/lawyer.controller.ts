import { Request,Response } from "express";
import Lawyer from '../models/Lawyer'

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

export const updateLawyerStatus = async (req: Request,res: Response) => {
	const { _id } = req.params
	const { status } = req.body
	try {
		const updatedLawyer = await Lawyer.findByIdAndUpdate(_id,{ status })
		res.status(200).json(updatedLawyer)
	} catch (error: any) {
		console.log(error);
		res.status(400).json(error.message)
	}
}
