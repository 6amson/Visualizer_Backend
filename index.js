const cors = require("cors");
const serverless = require('serverless-http');
const express = require('express');
const authRoutes = require('./routes/authRoutes')

const app = express();
const Path = '/.netlify/functions/index';


// middleware

app.use(cors());
app.use(cors({
    origin: "*",
}));
app.use(express.json());
// app.use(Path, authRoutes);
app.use(authRoutes);



app.listen(3001, () => {
    console.log('Server started on port 3001');
});

//   module.exports.handler = serverless(app);