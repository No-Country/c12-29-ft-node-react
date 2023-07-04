import app from "./app";
import { connectDB } from './database'

const main = () => {
	app.listen(app.get('port'))
	connectDB()
	console.log(`Listening on port ${app.get('port')}`);
}

main()
