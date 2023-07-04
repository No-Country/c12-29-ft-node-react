import { Request,Response } from "express"
import jwt from 'jsonwebtoken'
import Lawyer,{ ILawyer } from '../models/Lawyer'
import dotenv from 'dotenv'
import { encryptPassword,validatePassword } from "../utils/authUtils"

dotenv.config()

const { JWT_SECRET } = process.env

export const signup = async (req: Request,res: Response) => {
	const { password } = req.body
	const {isClient} = req.query
	try {
		//saving new user
		const hashedPassword = await encryptPassword(password)
		const newLawyer: ILawyer = new Lawyer({ ...req.body,hashedPassword })
		await newLawyer.save()
		//token
		const token = jwt.sign({ _id: newLawyer._id },JWT_SECRET || 'Secret')

		return res.header('token',token).status(201).json(newLawyer)
	} catch (error) {
		return res.status(400).json(error)
	}
}

export const signin = async (req: Request,res: Response) => {
	const { email,password } = req.body
	try {
		//find user
		const user = await Lawyer.findOne({ email })
		if (!user) throw new Error('Usuario o contraseña incorrecta')
		//password validation
		const validation = await validatePassword(password,user.hashedPassword)
		if (!validation) throw new Error('Contraseña incorrecta')
		//token
		const token = jwt.sign({ _id: user._id },JWT_SECRET || 'Secret')

		return res.header('token', token).status(200).json(user)
	} catch (error: any) {
		res.status(400).json(error.message)
	}
}
export const profile = (req: Request,res: Response) => {

	const token = req.headers.authorization?.substring(7)
	console.log(token);
	
	return res.status(200).json(token)

}