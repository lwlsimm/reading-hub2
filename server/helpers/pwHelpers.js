const bcrypt = require('bcryptjs');
const pool = require('../db/db');

function isPasswordValid(pw) {
    return  /[A-Z]/       .test(pw) &&
            /[a-z]/       .test(pw) &&
            /[0-9]/       .test(pw) &&
            /[^A-Za-z0-9]/.test(pw) &&
            pw.length > 6;
}

async function hashNewPassword (req, res, next) {
    try {
        const password = req.body.password;
        if(!isPasswordValid(password)) {
            throw new Error("Password is not valid!")
        }
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, async function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                req.body.hashedPassword = hash
                await next()
            });
        });
    } catch (error) {
        res.status(401).send(error.message);
    }
}

async function checkPassword (req, res, next) {
    try {
        const email  = req.body.email;
        const passwordEntered = req.body.password;
        const userData = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
        const id  = await userData.rows[0]['id'];
        const passwordData = await pool.query("SELECT hashed_pw FROM passwords WHERE user_id = $1", [id]);
        const dbPassword = await passwordData.rows[0]['hashed_pw'];
        bcrypt.compare(passwordEntered, dbPassword, async function(err, result) {
            if(result) {
                req.body.id = id;
                next();
            } else {
                const message = "Invalid password/email.  Please try again";
                res.status(401).send(message);
            }
        });
    } catch (error) {
        error.message = "Invalid password/email.  Please try again";
        res.status(401).send(error.message);
    }
}



async function changePassword (req, res, next) {
    try {
        const doesUserHaveAPwAlready = await pool.query("SELECT id FROM passwords WHERE user_id = $1",[req.body.user_id]);
        if(doesUserHaveAPwAlready.rows[0]) {
            const updatePw = await pool.query("UPDATE passwords SET hashed_pw = $1 WHERE user_id = $2", [req.body.hashedPassword,req.body.user_id]);
        } else {
            const addPwForNewUser = await pool.query("INSERT INTO passwords (user_id,hashed_pw) VALUES ($1,$2) RETURNING id",[req.body.user_id, req.body.hashedPassword])
        }
        next();
    } catch (error) {
        error.message = "Something went wrong.  Please contact support";
        res.status(401).send(error.message);
    }
}

exports.hashNewPassword = hashNewPassword;
exports.checkPassword = checkPassword;
exports.changePassword = changePassword;