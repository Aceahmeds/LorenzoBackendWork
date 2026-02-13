import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToDb =  async () =>{
    try { 
        const connection = await mongoose.connect(
            process.env.MONGO_DB_CONNECTION_STRING
        );
    //     console.log("Database connected successfully");
    //   console.log(connection.connection.name);
    //   console.log(connection.connection.host);

    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }    
}
    export default connectToDb;