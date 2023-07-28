
import dotenv from 'dotenv'
import mercadopago from 'mercadopago'
import { Request,Response } from 'express';
import Lawyer from '../models/Lawyer';
import Subscription from '../models/Subscription';
dotenv.config()


export const createPayment = async (req: Request,res: Response) => {
	try {
		const { subscription,userId } = req.body
		mercadopago.configure({
			access_token: "TEST-7499841737015948-072020-c04ebf0bc641a47760e53cae3c39b2a5-1415911684"
		})

		const result = await mercadopago.preferences.create({
			items: [
				{
					title: subscription.name,
					unit_price: subscription.price,
					currency_id: "ARS",
					quantity: 1
				}
			],
			external_reference: userId,
			back_urls: {
				success: "https://c12-29-ft-node-react.vercel.app/",
				pending: "https://c12-29-ft-node-react.vercel.app/",
				failure: "https://c12-29-ft-node-react.vercel.app/",
			},
			notification_url:
				"https://c12-29-ft-node-react.onrender.com/api/payments/webhook",
		})

		res.status(200).json(result)
	} catch (error: any) {
		console.log(error);

		return res.status(400).json(error)

	};
}

export const webhook = async (req: Request,res: Response) => {
	
	try {
		const payment = req?.query;
		const id = Number(payment["data.id"])
		if (payment.type === "payment") {
			const { body } = await mercadopago.payment.findById(id);

			const { status,external_reference,additional_info } = body;
			if (status === "approved") {

				const subscription = await Subscription.findOne({name: additional_info.items[0].title})
				
				const newLawer = await Lawyer.findByIdAndUpdate(external_reference,{ subscription },{ new: true })
				
				
				return res.status(200).json(newLawer);
			}
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
};