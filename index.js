const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./app/models");

const app = express();

// untuk port client
let whiteList = [
    'http://localhost:8081'
];

// cors untuk api ini
let corsOption = {
    origin: function (origin, callback){
        if(whiteList.indexOf(origin) !== -1 || !origin ){
            callback(null, true);
        }else{
            callback(new Error('Not Allowed by CORS'));
        }
    }
}

app.use(cors(corsOption));

// parse request application/json x-www-form-urlencode
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// sync database di model
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to ExMySQL"
    });
});

// post routes
require("./app/routes/post.routes")(app);


// untuk port jalan di server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});