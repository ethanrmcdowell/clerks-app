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

app.use(express.json())

app.get('/api/message', (req,res) => {
    res.json({ message: "HEY THERE does this thing work??" });
});

app.get('/api/garage', (req, res) => {
    const start = req.query.start;
    const end = req.query.end;

    const queryString = 'SELECT * FROM garage_sale WHERE sale_date BETWEEN @startDate AND @endDate';

    sql.connect(config)
        .then(() => {
            const request = new sql.Request();
            request.input('startDate', sql.Date, start);
            request.input('endDate', sql.Date, end);

            return request.query(queryString);
        })
        .then((recordset) => {
            res.json(recordset);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
          })
          .finally(() => {
            sql.close();
          });

    

    // sql.connect(config, function(err) {
    //     if (err) console.log(err);

    //     const request = new sql.Request();

    //     request.query("SELECT * FROM garage_sale ", function(err, recordset) {
    //         if (err) console.log(err);

    //         res.send(recordset);
    //     });
    // });
});

app.listen(3000, () => {
    console.log("Server listening on port 3000!");
});