const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 4321;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/tools/calculator", (req, res) => {
    res.render("tools/calculator");
});

app.get("/tools/timestamp", (req, res) => {
    res.render("tools/timestamp");
});

app.get("/tools/price", (req, res) => {
    res.render("tools/timestamp");
});

// Error page catch all, do not place paths after this one.
app.use((req, res) => {
    res.status(404).render("404");
});

app.listen(PORT, () => {
    console.log("Web listening on port " + PORT + ".");
});
