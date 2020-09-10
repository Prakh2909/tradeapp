const express = require("express");
const router = express.Router();
const Trade = require("../models/trade");


// Adding a Trade 
router.post("/trade", async (req,res)=>{    
    try {
        const trade = new Trade(req.body);
        await trade.save();
        res.send(trade);

    } catch (error) {
        res.status(500).send(error);
    }
})

// Updating a Trade using id as param
router.patch("/trade/:id", async (req,res)=>{

    // Running validations for allowed updates
    const updates = Object.keys(req.body); // fetching keys from body
    const allowedUpdates = ["type","ticker","price","shares"];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidUpdate){
        return res.status(400).send({error:"Invalid Updates"})
    }

    try {
        const trade = await Trade.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators: true});
        res.send(trade);
    } catch (error) {
        res.status(500).send(error);
    }
})

//Removing a Trade using id as param
router.delete("/trade/:id", async (req,res)=>{
    const _id = req.params.id;
    try {
        const trade = await Trade.findByIdAndDelete({ _id });
        res.send(trade);
    } catch (error) {
        
    }
})

// Fetching Portfolio Sort by Ticker
router.get("/portfolio", async (req, res)=>{
    try {
        const trade = await Trade.find({}).sort({ticker: 1});
        res.send(trade);
    } catch (error) {
        console.log(error);
    }
})

//Fetching holdings
router.get("/trade", async (req, res)=>{
    try {
        const trade = await Trade.getHoldings();
        res.send(trade);
    } catch (error) {
        console.log(error);
    }
})

//Fetching Returns
router.get("/returns", async (req,res)=>{
    const currentPrice = 100;
    try {
        const trades = await Trade.getHoldings();
        let returnAmount = 0;
        trades.forEach( trade => {
            returnAmount+= (currentPrice - trade.AverageBuyPrice)*trade.Shares;
        });
        res.send({returns: returnAmount});
    } catch (error) {
        
    }
})

module.exports = router;