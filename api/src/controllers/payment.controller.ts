import mercadopago from 'mercadopago'
import dotenv from 'dotenv'
dotenv.config()

const {MP_TOKEN_SECRET} = process.env;

export const createPayment = async () => {
	console.log(MP_TOKEN_SECRET);
	
	mercadopago.configure({
		access_token: MP_TOKEN_SECRET || ""
	})
}