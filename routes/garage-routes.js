const express = require('express');
const router = express.Router();
const sql = require('mssql');
const sqlConfig = require('../sqlConfig');

router.get('/search', (req, res) => {
    const filters = req.query;

    //SEARCHABLE FIELDS: sale_date, permit_no, name, street_addr, section, org_name, org_addr

    let queryString = "SELECT * FROM garage_sale WHERE";

    firstFilter = false;

    if (filters.startDate !== '' && filters.endDate !== '') {
        queryString +=  " sale_date BETWEEN '" + filters.startDate + "' AND '" + filters.endDate + "'";
        firstFilter = true;
    }

    if (filters.permitNum !== '') {
        if (firstFilter) queryString += " AND";
        queryString += " permit_no ='" + filters.permitNum + "'";
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

module.exports = router;