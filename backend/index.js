
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/databaseConnection.js';
import userRoute from './routes/userRoute.js'
import cors from 'cors'



dotenv.config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

export const createTables = async () => {
    //for USERMODEL
    try {
      // Synchronize all defined models to the database
      await User.sync({ force: true }); // This will drop the table if it already exists and then create a new one
      console.log("User Tables created successfully");
    } catch (error) {
      console.error("Error creating tables:", error);
    }
  };
  
//route


app.use('/api/v1/auth', userRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
    connectDB();
})
