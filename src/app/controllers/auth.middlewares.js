const jwtVariable = require('../../variables/jwt');
 
const Users = require('./../models/User'); 
 
const authMethod = require('./auth.methods');

// getUser = async _id => {
// 	try {
// 		const data = await Users.find({_id: _id}).value();
// 		return data;
// 	} catch {
// 		return null;
// 	}
// };


exports.isAuth = async (req, res, next) => {
	// Lấy access token từ header
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(401).send('Không tìm thấy access token!');
	}

	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!verified) {
		return res
			.status(401)
			.send('Bạn không có quyền truy cập vào tính năng này!');
	}
	getUser = async _id => {
		try {
			const data = await Users.find({_id: _id}).value();
			console.log('data: ', data);
			return data;
		} catch {
			return null;
		}
	};
	const idUser = verified.payload._id;  
	res.locals.idUser = idUser; 
	// console.log('res.locals.idUser: ', res.locals.idUser);
	return next();
};
