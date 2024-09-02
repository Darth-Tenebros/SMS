const bcrypt = require('bcryptjs');


const hashPassword = (password) => {
    const salt = bcrypt.genSalt();
    const hash = bcrypt.hash(password, salt);
    return hash;
}

