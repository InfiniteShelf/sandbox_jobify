import app               from "./app.js";
// Database
import connectToDatabase from "./db/connect.js";
// Port
const PORT  = process.env.PORT || 5000;
// Start the server
const start = async () => {
  await connectToDatabase(process.env.MONGO_URI);
  
  app.listen(PORT, () => console.log(`Server is listening on port ${ PORT }`));
};

start();