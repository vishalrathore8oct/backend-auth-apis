import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/db.connect.js";

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 5000

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🌐 Server is running on URL http://127.0.0.1:${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Database Connection Error", error);
        process.exit(1);
    })
