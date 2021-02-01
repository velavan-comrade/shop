const moongose=require("mongoose");

const requestSchema=moongose.Schema({
    _id:moongose.Schema.ObjectId,
    productName:String,
   // productId:Number,
    quantity:Number,
    status:String,
    branch:String,
    dateRequested:Number
});

module.exports=moongose.model("requests",requestSchema);