const dotenv = require('dotenv')
dotenv.config()
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPT_SECRET);
const oneWeek = 7 * 1000 * 60 * 60 * 24;
const pool = require('../db/db');

async function createToken (req,res,next) {
    try {
        const email = req.body.email;
        const expiry = new Date().getTime() + oneWeek;
        req.body.new_token  = cryptr.encrypt(email+"/"+expiry);
        const doesTokenEntryExist =  await pool.query("SELECT id FROM tokens WHERE user_id = ($1)",[req.body.id]);
        if(doesTokenEntryExist.rows[0]){
            const dbQuery = await pool.query("UPDATE tokens SET token = $1 WHERE user_id = $2 RETURNING id",[req.body.new_token,req.body.id]);
            if(!dbQuery.rows[0]) throw new Error();
        } else {
            console.log('fail')
            const dbQuery2 = await pool.query("INSERT INTO tokens (user_id,token) VALUES ($1,$2) RETURNING id",[req.body.id,req.body.new_token]);
            if(!dbQuery2.rows[0]) throw new Error();
        }
        next();
    } catch (error) {
        //error.message = "Something went wrong.  Please contact support";
        res.status(401).send(error.message);
    }
}

async function readToken(req,res,next) {
    try {
        const dbQuery = await pool.query("SELECT user_id, token FROM tokens WHERE token = $1", [req.body.token]);
        req.body.id = await dbQuery.rows[0]['user_id'];
        const now = new Date().getTime();
        const tokenValues = cryptr.decrypt(req.body.token).split("/");
        req.body.email = tokenValues[0];
        if(tokenValues[1] < now) throw new Error();
        next();
    } catch (error) {
        error.message ='Session has expired.  Please login again';
        res.status(401).send(error.message);
    }
}

async function destroyToken(req,res,next) {
    try {

        const dbQuery = await pool.query("UPDATE tokens SET token = null WHERE token = $1 RETURNING id",[req.body.token]);
        if(!dbQuery.rows[0]) throw new Error('Cannot find token');
        next()
    } catch (error) {
        res.status(401).send();
    }
}

exports.destroyToken = destroyToken;
exports.createToken = createToken;
exports.readToken = readToken;