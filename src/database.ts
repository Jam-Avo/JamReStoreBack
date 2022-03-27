import { mongodbConfig } from "config/database";
import mongoose from "mongoose";

mongoose.connect(mongodbConfig.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((db) => console.log("database connected success"))
    .catch((error) => console.log("database connected failed", error));