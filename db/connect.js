import mongoose from "mongoose";

const connectToDatabase = async url => {
  try {
    await mongoose.connect(url);
    console.log(`Successfully connected to the database!`);
  }
  catch (err) {
    console.error(`Error connecting to the MongoDB! ${ err }`);
    return;
  }
  
  mongoose.connection.on("error",
    err => console.error(`Error occurred after initial connection was established! The message: ${ err }`));
  
  mongoose.connection.on("disconnected", () => console.log(`Disconnected from the database!`));
};

export default connectToDatabase;