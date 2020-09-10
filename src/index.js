const express = require("express");
const app = express();
const port = process.env.PORT;
require("./db/mongoose");
const tradeRouter = require("./routes/trade");
app.use(express.json());

app.use(tradeRouter);

app.listen(port, ()=>{
    console.log("Server Listening on Port: "+ port);
})
