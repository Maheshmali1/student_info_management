const mongoose = require("mongoose");
import config from 'config';

const DBPath:string = config.get('DB_PATH');
export const DBconnection = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true
        };
        await mongoose.connect(DBPath, connectionParams);
        console.log("connected to database.");
    } catch (error) {
        console.log(error, "could not connect database.");
    }
}


// mongoose.connect("mongodb://localhost:27017/storeDB");