import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected successfully on ${conn.connection.host}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}