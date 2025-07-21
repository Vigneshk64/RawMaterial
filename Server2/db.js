const mongoose = require('mongoose')

const mongoURL ="mongodb://localhost:27017/NewDB"
const connectToMongo = async () =>{
    try{

        await mongoose.connect(mongoURL)
        console.log('----------------------------');
        console.log("Connect to mongo successful.");
        console.log('----------------------------');
       

    } catch(error){
        console.log("Connect to mongo unsuccessful",error);
        


    }
}

module.exports = connectToMongo;
