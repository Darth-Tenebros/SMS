const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const teacherRepository = require('../../database/teacher.database');

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

const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || ! password){
        return res.status(400).send({
            message: "you need to provide all details"
        })
    }

    //TODO: SEARCH TEACHER COLLECTION, IF NOT FOUND, SEARCH STUDENT COLLECTION
    let user = await teacherRepository.getTeacherByEmail(email);
    user = user._doc;
    if(!user){
        return res.status(404).send({
            message: `no user with email ${email} has been found`
        })
    }

    
    const isValid = bcrypt.compareSync(password, user.password);
    if(isValid){
        const token = generateJWTToken(user);
        return res.status(200)
        .json({
            data: token
        })
    }

    return res.status(401)
    .send({
        message: "invalid credentials"
    });
    
    
}

// console.log(generateJWTToken({_id: "1234", role:"student"}));
exports.hashPassword = hashPassword;
exports.generateJWTToken = generateJWTToken;
exports.login = login;