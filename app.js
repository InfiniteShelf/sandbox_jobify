import express from "express";
import dotenv  from "dotenv";
import morgan  from "morgan";
// import cors    from "cors";
import "express-async-errors";

const app = express();
dotenv.config();

// Custom Middleware imports
import notFoundMiddleware     from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

// app.use(cors());
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
app.use(express.json());

// Routes and imports
import routes from "./routes/index.js";

app.use("/api/v1", routes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;