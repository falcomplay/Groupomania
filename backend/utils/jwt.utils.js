const jwt = require("jsonwebtoken");

require("dotenv").config();

const JWT_SIGN_SECRET = process.env.TOKENSECRET;

// Exported functions
module.exports = {
	generateTokenForUser: function (userData) {
		return jwt.sign(
			{
				// signe notre token (payload)
				userId: userData.id, //id user
				isAdmin: userData.isAdmin,
			},
			JWT_SIGN_SECRET, // token secret
			{
				expiresIn: "24h", //expire au bout de 24h
			}
		);
	},
	parseAuthorization: function (authorization) {
		return authorization != null ? authorization.replace("Bearer ", "") : null;
	}, // récupére le token avant de remplacer 'bearer' par rien.
	getUserId: function (authorization) {
		let userId = -1; // définit un user par défault
		let token = module.exports.parseAuthorization(authorization);
		//on parse notre token grace au module fait précedemment
		if (token != null) {
			try {
				let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
				//verifie le token s'il est valid
				if (jwtToken != null)
					// si non nul
					userId = jwtToken.userId; // on récupére userId
			} catch (err) {}
		}
		return userId;
	},
	getAdmin: function (authorization) {
		let isAdmin = -1;
		let token = module.exports.parseAuthorization(authorization);
		if (token != null) {
			try {
				let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
				if (jwtToken != null)
					// si non nul
					isAdmin = jwtToken.isAdmin; // on récupére userId
			} catch (err) {}
		}
		return isAdmin;
	},
};
