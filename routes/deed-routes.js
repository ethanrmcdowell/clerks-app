const express = require('express');
const router = express.Router();
const sql = require('mssql');
const sqlConfig = require('../sqlConfig');

router.get('/search', (req, res) => {
  const filters = req.query;

  let queryString = "SELECT * FROM deeds WHERE";

  let firstFilter = false;

  if (filters.startDate !== '' && filters.endDate !== '') {
    queryString += " doc_date BETWEEN '" + filters.startDate + "' AND '" + filters.endDate + "'";
    firstFilter = true;
  }

  if (filters.sidwell !== '') {
    if (firstFilter) queryString += " AND";
    queryString += " sidwell = '" + filters.sidwell + "'";
    firstFilter = true;
  }

  if (filters.liber !== '') {
    if (firstFilter) queryString += " AND";
    queryString += " liber = '" + filters.liber + "'";
    firstFilter = true;
  }

  if (filters.pageStart !== '' && filters.pageEnd !== '') {
    if (firstFilter) queryString += " AND";
    queryString += " page_no BETWEEN '" + filters.pageStart + "' AND '" + filters.pageEnd + "'";
    firstFilter = true;
  }

  if (filters.grantor !== '') {
    if (firstFilter) queryString += " AND";
    queryString += " grantor = '" + filters.grantor + "'";
    firstFilter = true;
  }

  if (filters.description !== '') {
    if (firstFilter) queryString += " AND";
    queryString += " text_desc LIKE '%" + filters.description + "%'";
    firstFilter = true;
  }

  queryString += " ORDER BY doc_date;";

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

// route for adding new deed (etc) records
router.get('/add', (req, res) => {
  console.log("DEEDS ADD ROUTE~~");

  const filters = req.query;

  let queryString = "INSERT INTO deeds (sidwell, liber, page_no, grantor, grantee, section, propdesc, use, " + 
    "doc_type, doc_date, rec_date, text_desc) VALUES ('" + filters.sidwell + "', '" + filters.liber + "', '" + 
    filters.pageNo + "', '" + filters.grantor + "', '" + filters.grantee + "', '" + filters.section + "', '" + 
    filters.propDescription + "', '" + filters.use + "', '" + filters.docType + "', '" + filters.docDate + "', '" + 
    filters.recDate + "', '" + filters.textDescription + "');";

    console.log(queryString);
});

module.exports = router;