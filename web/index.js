if (existsSync(".env")) process.loadEnvFile(".env");
import express from "express";
import path from "path";
import { existsSync } from "fs";
import { ExpressAuth, getSession } from "@auth/express";
import { fileURLToPath } from "url";
import Discord from "@auth/express/providers/discord";

const app = express();
const PORT = process.env.PORT || 4321;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AUTH_CONFIG = {
    providers: [Discord],
    secret: process.env.AUTH_SECRET,
    basePath: process.env.AUTH_URL,
};
app.set("trust proxy", true);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/auth", ExpressAuth(AUTH_CONFIG));

async function authSession(req, res, next) {
    res.locals.session = await getSession(req, AUTH_CONFIG);
    next();
}

async function authenticatedUser(req, res, next) {
    const session = res.locals.session ?? (await getSession(req, AUTH_CONFIG));
    if (!session?.user) {
        res.redirect("/auth/signin");
    } else {
        next();
    }
}

app.use(authSession);

app.get("/", (req, res) => {
    res.render("index", { user: res.locals.session?.user });
});

app.get("/contact", (req, res) => {
    res.render("contact", { user: res.locals.session?.user });
});

app.get("/tools/calculator", (req, res) => {
    res.render("tools/calculator", { user: res.locals.session?.user });
});

app.get("/tools/timestamp", (req, res) => {
    res.render("tools/timestamp", { user: res.locals.session?.user });
});

app.get("/tools/price", (req, res) => {
    res.render("tools/price", { user: res.locals.session?.user });
});

app.use("/planner/*splat", authenticatedUser, (req, res, next) => {
    next();
});

app.get("/planner/create", (req, res) => {
    res.render("index", { user: res.locals.session?.user });
});

// Error page catch all, do not place paths after this one.
app.use((req, res) => {
    res.status(404).render("404", { user: res.locals.session?.user });
});

app.listen(PORT, () => {
    console.log("Web listening on port " + PORT + ".");
});
