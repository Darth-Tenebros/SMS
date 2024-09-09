const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const teacherRepository = require('../../database/teacher.database');
const studentRepository = require('../../database/student.database')

const SECRET_KEY = 'supersecuresecretkey';


const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}


const generateJWTToken = (user) => {
    // TODO: store in .env
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
    if(!user){
        user = await studentRepository.getStudentByEmail(email);
    }
    user = user._doc;
    if(!user){
        return res.status(404).send({
            message: `no user with email ${email} has been found`
        })
    }

    
    const isValid = bcrypt.compareSync(password, user.password);
    if(isValid){
        const token = generateJWTToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Strict',
            maxAge: 3600000
        })
        return res.status(200)
        .json({
            data: user.role,
            token: token
        })
    }

    return res.status(401)
    .send({
        message: "invalid credentials"
    });
    
    
}

const verifyTokenMiddleWare = (req, res, next) => {
    let token = req.headers['authorization'];

    if(!token){
        return res.status(403)
                .send({
                    message: "no token provided"
                });
    }

    token = token.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if(err){
            return res.status(401)
                    .send({
                        message: "unauthorised"
                    })
        }

        req.user = decoded;
        next();
    })
}

const authorizeRolesMiddleware = (roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403)
                    .send({
                        message: "forbidden"
                    })
        }
        next();
    }
}

module.exports = {login, generateJWTToken, hashPassword, verifyTokenMiddleWare, authorizeRolesMiddleware}