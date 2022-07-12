import express, { json, Request, Response } from "express";
import cors from "cors";
import router from "./routes/routes.js";
import handlerError from "./middlewares/handlerError.js";
import "./config.js";
import "express-async-errors";

const app = express();

app.use(json());
app.use(cors());
app.use(router);
app.use(handlerError);

app.get("/", (req: Request, res: Response) => {
  return res.send(200);
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server online");
});
