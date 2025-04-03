import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONOG_URI)
        console.log(`✅ Database Connected! DB Host: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("❌ Database Connection Failed", error);
        process.exit(1)
    }

}

export default connectDB