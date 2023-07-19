import { Request,Response } from "express"
import Speciality from "../models/Speciality"

export const getSpecialities = async (req: Request,res: Response) => {
	try {
		const allSpecialities = await Speciality.find()

		return res.status(200).json(allSpecialities)
	} catch (error) {
		return res.status(400).json(error)
	}
}

export const createSpeciality = async (req: Request,res: Response) => {
	const { name } = req.body
	try {
		const newSpeciality = new Speciality({ name })
		await newSpeciality.save()

		return res.status(200).json(newSpeciality)
	} catch (error) {
		return res.status(400).json(error)
	}
}

export const updateSpeciality = async (req: Request,res: Response) => {
	const { _id } = req.params
	const { name } = req.body
	try {
		const updatedSpeciality = await Speciality.findByIdAndUpdate(_id,{ name },{ new: true })
		return res.status(200).json(updatedSpeciality)
	} catch (error) {
		return res.status(400).json(error)
	}
}

export const deleteSpeciality = async (req: Request,res: Response) => {
	const { _id } = req.params
	try {
		await Speciality.findByIdAndDelete(_id)
		return res.status(200).json('Especialidad borrada correctamente')
	} catch (error) {
		return res.status(400).json(error)
	}
}