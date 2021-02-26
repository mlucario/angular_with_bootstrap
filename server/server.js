const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// * GET DB CONNECTION
const db = require('./config/db.initial.config');

// * Logger
const { printError, printLog } = require('./utils/log');

// * SET SERVER PORT
// NOTE dotenv is required to read .env file
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;


// CREATE express
const app = express();

// Cors broswer
const corsOptions = {
    origin: 'http://localhost:4200',
};

// * SETUP OUR SERVER
app.use(express.static('public'));
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



db.CREATE_USERS_TABLE();
db.CREATE_ROLES_TABLE();




// ! Use for test
app.get('/', (req, res) => {
    res.json({ message: 'Test Express JS' });
});

// * ROUTES
const authRoute = require('./routes/auth.routes');
app.use('/api/v1/auth',authRoute);

app.listen(PORT, () => { 
    printLog(`Server is running on port ${PORT}.`); 
  
})
