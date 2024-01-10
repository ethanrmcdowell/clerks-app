const express = require('express');
const router = express.Router();
const sql = require('mssql');
const sqlConfig = require('../sqlConfig');

router.get('/search', (req, res) => {
    const start = req.query.startDate;
    const end = req.query.endDate;

    const filters = req.query;

    //SEARCHABLE FIELDS: sale_date, permit_no, name, street_addr, section, org_name, org_addr

    let queryString = 'SELECT * FROM garage_sale'

    let addWhere = false;
    for (const key in filters) {
        if (filters[key] !== '') {
            addWhere = true;
        }
    }

    if (addWhere) queryString += ' WHERE';

    if (filters.startDate !== '') {
        
    }

    if (filters.endDate !== '') {
        
    }

    if (filters.permitNum !== '') {
        
    }

    if (filters.name !== '') {
        
    }

    if (filters.address !== '') {
        
    }

    if (filters.section !== '') {
        
    }

    if (filters.orgName !== '') {
        
    }

    if (filters.address !== '') {
        
    }

    // const queryString = 'SELECT * FROM garage_sale WHERE sale_date BETWEEN @startDate AND @endDate';

    // sql.connect(sqlConfig)
    //     .then(() => {
    //         const request = new sql.Request();
    //         request.input('startDate', sql.Date, start);
    //         request.input('endDate', sql.Date, end);

    //         return request.query(queryString);
    //     })
    //     .then((recordset) => {
    //         res.json(recordset.recordsets);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         res.status(500).send('Internal Server Error');
    //       })
    //       .finally(() => {
    //         sql.close();
    //       });
});

module.exports = router;