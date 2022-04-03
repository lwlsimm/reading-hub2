const bcrypt = require('bcryptjs');
const pool = require('../db/db');
const ReadingPlan = require("./classes/ReadingPlan");

async function createPlan(req,res,next) {
    try {
        const {start,end,measure,mode,startDate,endDate,measurePerDay,book} = req.body.planDetails;
        const id = createBookId(book);
        const readingPlan = new ReadingPlan(id,startDate,start,end,measurePerDay,endDate,mode,measure,book);
        readingPlan.create_new_plan;
        req.body.plan = JSON.stringify(readingPlan.plan_scheme);
        req.body.book = readingPlan.basic_details;
        next()
    } catch(error) {
        error.message = "Something went wrong.  Please contact support";
        res.status(401).send(error.message);
    }
}

async function savePlan(req,res,next) {
    try {
        const query = await savePlanToDB(req.body.book,req.body.plan,req.body.id);
        if(query) {
            next()
        } else {
            throw new Error();
        }
    } catch(error) {
        error.message = "Something went wrong.  Please contact support";
        res.status(401).send(error.message);
    }
}

async function savePlanToDB(basic_details, plan_scheme, user_id) {
    try {
        const {id} = basic_details;
        const bookObject = encodeData(basic_details);
        const plan = encodeData(plan_scheme);
        // Does the plan exist
        const query1 = await pool.query("SELECT id FROM books WHERE id = $1", [id]);
        const planExists = query1.rows[0];
        if(!planExists) {
            const query2 = await pool.query("INSERT INTO books (id,user_id,bookobject,plan) VALUES ($1,$2,$3,$4) RETURNING id",
                [id,user_id,bookObject,plan]);
            if(query2.rows[0]['id']) {
                return true
            } else {
                return false
            }
        } else {
            const query3 = await pool.query("UPDATE books SET bookobject = $1, plan = $2 WHERE id = $3 RETURNING id",[bookObject,plan,id]);
            if(query3.rows[0]['id']) {
                return true
            } else {
                return false
            }
        }
    } catch (e) {
        console.log(e.code);
    }
}

function encodeData(data) {
    return Buffer.from(JSON.stringify(data)).toString('base64');
}

function extractData(data) {
    return JSON.parse(Buffer.from(data, 'base64').toString('ascii'));
}

function createBookId (bookObj) {
    const timeNow = new Date();
    const timeInMss = timeNow.getTime();
    const title = bookObj.title.replaceAll(/[.,\/#'!$%\^&\*;:{}=\-_`~()]/g,"").replaceAll(" ","");
    const randomNumber = Math.floor(Math.random() * 2000000);
    const id = String(`${timeInMss}${title}${randomNumber}`);
    return id;
}


exports.createPlan = createPlan;
exports.savePlan = savePlan;