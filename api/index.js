import express from "express";
import { router } from "express-file-routing";
const PORT = process.env.PORT || 2000;

const app = express();

app.use("/", await router());

export default app;
if (process.env.NODE_ENV !== "test")
    app.listen(PORT, () => console.log("API listening on port " + PORT + "."));
