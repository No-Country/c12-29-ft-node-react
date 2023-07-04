import { Request,Response } from "express"
import jwt from 'jsonwebtoken'
import Lawyer,{ ILawyer } from '../models/Lawyer'
import Client,{ IClient } from "../models/Client"
import dotenv from 'dotenv'
import { encryptPassword,validatePassword } from "../utils/authUtils"

dotenv.config()

const { JWT_SECRET } = process.env

export const signup = async (req: Request,res: Response) => {
	const { password } = req.body
	const { isClient } = req.query
	try {
		//saving new user
		const hashedPassword = await encryptPassword(password)
		const newUser: ILawyer | IClient = isClient ? new Client({ ...req.body,hashedPassword }) : new Lawyer({ ...req.body,hashedPassword })
		await newUser.save()
		//token
		const token = jwt.sign({ _id: newUser._id },JWT_SECRET || 'Secret')

		return res.header('token',token).status(201).json(newUser)
	} catch (error) {
		return res.status(400).json(error)
	}
}

export const signin = async (req: Request,res: Response) => {
	const { email,password } = req.body
	const { isClient } = req.query

	try {
		//find user
		const user = isClient? await Client.findOne({ email }): await Lawyer.findOne({ email }) 
		if (!user) throw new Error('Usuario o contraseña incorrecta')
		//password validation
		const validation = await validatePassword(password,user.hashedPassword)
		if (!validation) throw new Error('Contraseña incorrecta')
		//token
		const token = jwt.sign({ _id: user._id },JWT_SECRET || 'Secret')

		return res.header('token',token).status(200).json(user)
	} catch (error: any) {
		res.status(400).json(error.message)
	}
}
export const profile = (req: Request,res: Response) => {

	const token = req.headers.authorization?.substring(7)
	console.log(token);

	return res.status(200).json(token)

}