const express = require('express');
const app = express();

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    next();
});

app.get('/api/message', (req,res) => {
    res.json({ message: "HEY THERE does this thing work??" });
});

app.listen(3000, () => {
    console.log("Server listening on port 3000!");
});