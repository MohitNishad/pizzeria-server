import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import mongoose from "mongoose";
import errorHandler from "./middlewares/error-handler";
import routes from "./modules"
import morgan from "morgan";
const PORT = process.env.PORT;


app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json({limit:'8mb'}));
app.use(morgan("common"));


/* PASSPORT  */
require("./passport");
app.use(passport.initialize());
/* -------------------------> */

// Routes 
app.use(routes)

// HEALTH CHECK
app.get("/", (req, res) => {
    res.json({ message: "api is healthy" });
});


/* ===== Error handler ===== */
app.use(errorHandler);

mongoose
    .connect(process.env.MONGODB_URL as string)
    .then(() => {
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    })
    .catch((e) => {
        console.log(e);
    });

          