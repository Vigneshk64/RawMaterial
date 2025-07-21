const CategorySchema=require('../Module/Category.js')
const {json} = require ('express')


const Insert = async(req,res)=>{
    try{
        const { Categoryname} = req.body;

        const Category = new CategorySchema({
            Categoryname:Categoryname

        })

        const savecategory = await Category.save();

        res.send(savecategory)


    }catch(error){
     
    console.log(error)

    }
}

const View= async(req,res)=>{
    try{
        const data=await CategorySchema.find();
        res.json(data)
    }catch(error){
        console.log(error)
    }


}
module.exports=  {Insert,View}  
