// Imports
const express = require("express"); //framework
const path = require("path");

const helmet = require("helmet");
const xssClean = require("xss-clean");
const cookieSession = require("cookie-session");
const noCache = require("nocache");

// Routes
const loginRoutes = require("./routes/login");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

const app = express();

app.use(helmet());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

const expiryDate = new Date(Date.now() + 60 * 60 * 1000); //1h

app.use(
	cookieSession({
		name: "session",
		keys: ["key1", "key2"],
		cookie: {
			secure: true,
			httpOnly: true,
			domain: "http://localhost:3000/",
			expires: expiryDate,
		},
	})
);

app.use(noCache());
app.disable("x-powered-by");
app.use(xssClean());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", loginRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

module.exports = app;
