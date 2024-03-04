const express = require('express');
const router = express.Router();
const sql = require('mssql');
const sqlConfig = require('../sqlConfig');

// route for searching meetings
router.get('/search', (req, res) => {
  const filters = req.query;

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
});

// route for editing existing meeting
router.get('/edit', (req, res) => {
  console.log("MEETING EDIT ROUTE~~");

  const filters = req.query;

  let queryString = "UPDATE index_hdr SET entry_date = '" + filters.meetingDate + "', reference = '" +
    filters.reference + "', sub_ref1 = '" + filters.subReference + "', description = '" +
    filters.description + "' WHERE idno = '" + filters.idNo + "';";

  console.log(queryString);
});

// route for deleting existing meeting
router.get('/delete', (req, res) => {
  console.log("MEETING DELETE ROUTE~~");

  const filters = req.query;

  let queryString = "DELETE FROM index_hdr WHERE idno = '" + filters.idNo + "';";

  console.log(queryString);
});

module.exports = router;