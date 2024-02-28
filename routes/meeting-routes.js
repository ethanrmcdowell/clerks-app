const express = require('express');
const router = express.Router();
const sql = require('mssql');
const sqlConfig = require('../sqlConfig');

router.get('/search', (req, res) => {
  // sql table fields: entry_date, idno, description
  // filters: startDate, endDate, keyword1, keyword2, idNumber

  const filters = req.query;

  console.log(filters);

  let queryString = "SELECT * FROM index_hdr WHERE";

  let firstFilter = false;

  if (filters.startDate !== '' && filters.endDate !== '') {
    queryString += " entry_date BETWEEN '" + filters.startDate + "' AND '" + filters.endDate + "'";
    firstFilter = true;
  }

  if (filters.idNumber !== '') {
    if (firstFilter) queryString += " AND";
    queryString += " idno = '" + filters.idNumber + "'";
    firstFilter = true;
  }

  if (filters.keyword1 !== '') {
    if (firstFilter) queryString += " AND";
    queryString += " description LIKE '%" + filters.keyword1 + "%'";
    firstFilter = true;
  }

  if (filters.keyword2 !== '') {
    if (firstFilter) queryString += " AND";
    queryString += " description LIKE '%" + filters.keyword2 + "%'";
    firstFilter = true;
  }

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
      res.status(500).send("Internal Service Error");
    })
    .finally(() => {
      sql.close();
    });
});

// route for adding new meeting records
router.get('/add', (req, res) => {
  console.log("MEETING ADD ROUTE~~");

  const filters = req.query;

  let queryString = "INSERT INTO index_hdr (entry_date, reference, sub_ref1, datestamp," +
    " description) VALUES ('" + filters.meetingDate + "', '" + filters.reference + "', '" +
    filters.subReference + "', '" + filters.timestamp + "', '" + filters.description + "');";

    console.log(queryString);

    // DB account is currently read-only, no add/delete/update implemented yet...
});

module.exports = router;