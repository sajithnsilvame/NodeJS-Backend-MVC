import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";
import connectDB from "./database/database.mjs";
import Routes from "./routes/routers.mjs";

const app = express();
const corsOptions = {
  origin: true, 
  optionsSuccessStatus: 200,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

// env config
config();
// db connection
connectDB();
// Routes
app.use("/api", Routes);

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
