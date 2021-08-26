const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // 5 requêtes
	message: "Trop de requêtes, veuillez attendre 15 minutes",
});

module.exports = {
	limiter: apiLimiter,
};
