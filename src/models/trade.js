const mongoose = require("mongoose");

const tradeSchema = mongoose.Schema({
    type: {
        type: String,
        default: "buy",
        uppercase: true,
        validate(value){
            allowedValues = ["BUY","SELL"];
            const isValid = allowedValues.includes(value);
            if(!isValid){
                throw new Error("Type must be sell or buy")
            } 
        }
    },
    ticker: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        validate(value){
            if(value <= 0){
                throw new Error("Enter a valid price.")
            }
        }
    },
    shares: {
        type: Number,
        required: true,
        validate(value){
            if(value <= 0){
                throw new Error("Enter a Valid no. of Shares")
            }
        }
    }
},{
    timestamps: true    
});

// Removing unnessary data 
tradeSchema.methods.toJSON = function() {
    const trade = this;
    const tradeObject = trade.toObject();
    
    delete tradeObject.createdAt;
    delete tradeObject.updatedAt;

    return tradeObject;
}

// Making getHoldings function global
tradeSchema.statics.getHoldings = async function() {
    const trade = await Trade.aggregate(
        [
            {
                $group:{
                    _id:"$ticker",
                    totalPrice: { $sum: { $multiply: [ "$price", "$shares" ] } },
                    totalShares: { $sum: "$shares" }
                }
            },
            {
                $project:{
                    AverageBuyPrice: {$divide: ["$totalPrice","$totalShares"]},
                    Shares: "$totalShares"
                }
            }
        ]
    );
    return trade;
}

const Trade = mongoose.model("trade", tradeSchema);

module.exports = Trade;