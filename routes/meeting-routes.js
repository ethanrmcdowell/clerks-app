const express = require('express');
const router = express.Router();
const sql = require('mssql');
const sqlConfig = require('../sqlConfig');

router.get('/search', (req, res) => {
  const filters = req.query;

  let queryString = "SELECT TOP 10 * FROM index_hdr;";

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

module.exports = router;