const pool = require('../db/db');

async function isEmailAvailable(req, res, next) {
    try {
        const dbQuery = await pool.query("SELECT id FROM users WHERE email = $1", [req.body.email]);
        const emailIsAvailable = !dbQuery.rows[0];
        if(!emailIsAvailable) {
            throw new Error("Email address not available")
        }
        next();
    } catch (error) {
        res.status(401).send(error.message);
    }
}

async function isEmailValid(req, res, next) {
    try {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (regex.test(req.body.email) === false) {
            throw new Error('Email is not valid.  Please enter a valid email address');
        }
        next()
    } catch (error) {
        res.status(401).send(error.message);
    }
}

async function addNewUserToDb(req, res, next) {
    try {
        const dbQuery = await pool.query("INSERT INTO users (email,name) VALUES ($1,$2) RETURNING id",[req.body.email, req.body.name]);
        req.body.user_id = await dbQuery.rows[0]['id'];
        next();
    } catch (error) {
        error.message = "Something went wrong.  Your registration was unsuccessful.  Please contact support";
        res.status(401).send(error.message);
    }
}

async function getIdFromEmail(req,res,next) {
    try{
        const dbQuery = await pool.query("SELECT id FROM users WHERE email = ($1)",[req.body.email]);
        req.body.id = await dbQuery.rows[0]['id'];
        next();
    } catch (error) {
        error.message = "Something went wrong.  Your account could not be found.  Please contact support";
        res.status(401).send(error.message);
    }
}



exports.isEmailAvailable = isEmailAvailable;
exports.addNewUserToDb = addNewUserToDb;
exports.getIdFromEmail = getIdFromEmail;
exports.isEmailValid = isEmailValid;