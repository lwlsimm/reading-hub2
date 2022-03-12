const express = require('express')
const app = express()
const PORT = process.env.PORT || 5500;
const cors = require('cors');



//Middleware//
//Cors allows cross-origin resoucres
app.use(cors());
//Json parses the body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const apiRouter = require('./server/api');
app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});