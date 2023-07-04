import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv'
dotenv.config()

const { JWT_SECRET } = process.env

export const encryptPassword = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(5);
	return await bcrypt.hash(password, salt)
}

export const validatePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
	return await bcrypt.compare(password, hashedPassword)
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.substring(7)
		if(!token) throw new Error('Acceso denegado')
		const payload = jwt.verify(token, JWT_SECRET || 'Secret')
		
		next()
	} catch (error: any) {
		return res.status(400).json(error.message)
	}
}