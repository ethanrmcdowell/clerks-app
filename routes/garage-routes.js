const express = require('express');
const router = express.Router();
const sql = require('mssql');
const sqlConfig = require('../sqlConfig');

// route for searching garage sale records
router.get('/search', (req, res) => {
    const filters = req.query;

    let queryString = "SELECT * FROM garage_sale WHERE";

    let firstFilter = false;

    if (filters.startDate !== '' && filters.endDate !== '') {
        queryString +=  " sale_date BETWEEN '" + filters.startDate + "' AND '" + filters.endDate + "'";
        firstFilter = true;
    }

    if (filters.permitNo !== '') {
        if (firstFilter) queryString += " AND";
        queryString += " permit_no ='" + filters.permitNo + "'";
        firstFilter = true;
    }

    if (filters.name !== '') {
        if (firstFilter) queryString += " AND";
        queryString += " name LIKE '%" + filters.name + "%'";
        firstFilter = true;
    }

    if (filters.address !== '') {
        if (firstFilter) queryString += " AND";
        queryString += " street_addr LIKE '%" + filters.address + "%'";
        firstFilter = true;
    }

    if (filters.section !== '') {
        if (firstFilter) queryString += " AND";
        queryString += " section = '" + filters.section + "'";
        firstFilter = true;
    }

    if (filters.orgName !== '') {
        if (firstFilter) queryString += " AND";
        queryString += " org_name LIKE '%" + filters.orgName + "%'";
        firstFilter = true;
    }

    if (filters.orgAddress !== '') {
        if (firstFilter) queryString += " AND";
        queryString += " org_addr LIKE '%" + filters.orgAddress + "%'";
    }

    queryString += ";";

    console.log(queryString);

    sql.connect(sqlConfig)
        .then(() => {
            const request = new sql.Request();
            return request.query(queryString);
        })
        .then((recordset) => {
            res.json(recordset.recordsets);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        })
        .finally(() => {
            sql.close();
        });
});

// route for adding a new garage sale
router.get('/add', (req, res) => {
    console.log("GARAGE SALE ADD ROUTE~~");

    const filters = req.query;

    let queryString = "INSERT INTO garage_sale (permit_no, name, street_addr, zip, section, " +
        "phone, sale_date, end_date, org_name, org_addr, org_phone, uid, datestamp) VALUES ('" +
        filters.permitNo + "', '" + filters.name + "', '" + filters.address + "', '" + filters.zip +
        "', '" + filters.section + "', '" + filters.telephone + "', '" + filters.startDate  + "', '" + 
        filters.endDate + "', '" + filters.orgName + "', '" + filters.orgAddress + "', '" + filters.orgTelephone +
        "', 'emcdowell', '" + filters.timestamp + "';"; 
        
    console.log(queryString);
});

// route for getting garage sale by date report
router.get('/report', (req, res) => {
    console.log("GARAGE SALE REPORT ROUTE~~");

    const filters = req.query;

    let queryString = "SELECT * FROM garage_sale WHERE sale_date BETWEEN '" + filters.startDate +
        "' AND '" + filters.endDate + "'";

    console.log(queryString);

    sql.connect(sqlConfig)
    .then(() => {
        const request = new sql.Request();
        return request.query(queryString);
    })
    .then((recordset) => {
        res.json(recordset.recordsets);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Internal Server Error');
    })
    .finally(() => {
        sql.close();
    });
});

// route for editing existing garage sale
router.get('/edit', (req, res) => {
    console.log("GARAGE SALE EDIT ROUTE~~");

    const filters = req.query;

    let queryString = "UPDATE garage_sale SET name = '" + filters.name + "', street_addr = '" + filters.address +
        "', zip = '" + filters.zip + "', section = '" + filters.section + "', phone = '" + filters.telephone +
        "', sale_date = '" + filters.startDate + "', end_date = '" + filters.endDate + "', org_name = '" +
        filters.orgName + "', org_addr = '" + filters.orgAddress + "', org_phone = '" + filters.orgTelephone +
        "' WHERE permit_no = '" + filters.permitNo + "';";

    console.log(queryString);
});

// route for deleting existing garage sale
router.get('/delete', (req, res) => {
    console.log("GARAGE SALE DELETE ROUTE~~");

    const filters = req.query;

    let queryString = "DELETE FROM garage_sale WHERE permit_no = '" + filters.permitNo + "';";

    console.log(queryString);
});

module.exports = router;