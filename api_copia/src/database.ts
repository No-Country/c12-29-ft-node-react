import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const { DB_USERNAME, DB_PASSWORD } = process.env;

export const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.tk7qym9.mongodb.net/database?retryWrites=true&w=majority`);
				console.log("Connected to database ");
    } catch (error) {
        console.log(error);
    }
}

