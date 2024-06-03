import { connect } from "mongoose";
// import mysql from "mysql";
import { config } from "dotenv";
config();

const mongoURI = process.env.MONGODB_HOST;

const connectDB = async () => {
    try{
        await connect(mongoURI);
        console.log("Mongo database connected");
    }
    catch(err){
        console.log(err, "database error");
    }
}

/* If you hope to use mysql database, you 
   can use the following code to connect to the database.
   (must install mysql package first in your terminal with `npm i mysql`)
*/

/*
const connectDB = async () => {
    try{
        await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
        console.log("MySQL database connected");
    }
    catch(err){
        console.log(err, "database error");
    }
}

*/



export default connectDB;