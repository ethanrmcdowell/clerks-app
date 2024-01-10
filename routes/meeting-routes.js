const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json('Meeting routes');
});

module.exports = router;