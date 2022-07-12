import express from "express";
import "express-async-errors";
import cors from "cors";
import router from "./routes/routes.js";
import handlerError from "./middlewares/handlerError.js";
import "./config.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(handlerError);

app.listen(process.env.PORT || 4000, () => {
    console.log("Server online");
});

export default app;
