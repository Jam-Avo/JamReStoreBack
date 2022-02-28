import 'module-alias/register';
import "reflect-metadata";
import express from "express";
import { Request, Response }  from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "routes";

//variables de entorno para desarrollo
if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config();
}

//puerto
const PORT = process.env.PORT || 4000;

//variables de entorno para desarrollo
if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config();
}

//url front
console.log("Front URL ", process.env.FRONT_URL);

//app
const app = express();

//Parseo de hearder y body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//cors
var corsOptions = {
  origin: process.env.FRONT_URL,
  credentials: true 
};
app.use(cors(corsOptions));

//herlmet
app.use(helmet());

//routes
app.use('/', routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to JamReStore's API!");
});

//listen port
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});