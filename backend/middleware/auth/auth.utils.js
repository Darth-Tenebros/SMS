const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}


const generateJWTToken = (user) => {
    // TODO: store in .env
    const SECRET_KEY = 'supersecuresecretkey';
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        SECRET_KEY,
        {
            expiresIn: '1h'
        }
    );
}

// console.log(generateJWTToken({_id: "1234", role:"student"}));
exports.hashPassword = hashPassword;
exports.generateJWTToken = generateJWTToken;