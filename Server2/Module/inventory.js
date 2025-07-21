const mongoose = require('mongoose');
const {Schema} = mongoose;

const InventorySchema = new Schema({
    name:{
        type:String,
    },
   
    revenue:{
        type:String,
    },
    
    status:{
        type:String,
    },
     
    
    notes:{
        type:String,
    },
    category:{
        type:String,
    },
    image:{
        type:String,
    }
    
 

})

module.exports = mongoose.model("Inventory",InventorySchema)