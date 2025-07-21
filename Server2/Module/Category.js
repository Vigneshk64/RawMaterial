const mongoose=require('mongoose')
const { Schema }= mongoose;

const CategorySchema = new Schema({

    Categoryname: {
        type: String
    }

})

module.exports=mongoose.model ('Category',CategorySchema);


