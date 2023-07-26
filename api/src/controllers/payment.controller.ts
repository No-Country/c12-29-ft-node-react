
import dotenv from 'dotenv'
import axios from 'axios';
import { Request,Response } from 'express';
dotenv.config()

const { ACCESS_TOKEN_MP } = process.env;

export const createPayment = async (req: Request,res: Response) => {
	try {
		
		const {email, subscriptionName, subscriptionPrice} = req.body
		const url = "https://api.mercadopago.com/preapproval";
	
		const headers = {
			"Authorization": `Bearer ${ACCESS_TOKEN_MP}`,
			"Content-Type": "application/json"
		};
		
		const data = {
			reason: subscriptionName,
			payer_email: email,
			auto_recurring: {
				frequency: 1,
				frequency_type: "months",
				transaction_amount: subscriptionPrice,
				currency_id: "ARS"
			},
			back_url: "https://www.yoursite.com",
			status: "pending"
		};
		
		const subscription = await axios.post(url, data, { headers })
		console.log(subscription.data);
		
		res.status(200).json(subscription.data)
	} catch (error:any) {
		return res.status(400).json(error.response.data)

	};
}

export const webhook = () => {
	
} 