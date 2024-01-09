const express = require('express');
const app = express();
const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
    }
}

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    next();
});

app.get('/api/message', (req,res) => {
    res.json({ message: "HEY THERE does this thing work??" });
});

app.get('/api/sql', (req, res) => {
    sql.connect(config, function(err) {
        if (err) console.log(err);

        const request = new sql.Request();

        request.query('select * from garage_sale', function(err, recordset) {
            if (err) console.log(err);

            res.send(recordset);
        })
    })
})

app.listen(3000, () => {
    console.log("Server listening on port 3000!");
});