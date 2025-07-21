const inventorySchema=require('../Module/inventory.js')
const {json} = require ('express')


const Insert = async (req, res) => {
    try {
        const { name,  revenue,rating, status, notes, category } = req.body;
        const image = req.file ? req.file.filename : null; // Get uploaded image filename

        // Validate Required Fields
        if (!name ||  !revenue ||  !status || !category) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const Inventory = new inventorySchema({
            name,
            revenue,
            status,
            notes,
            category,
            image
        });

        const saveInvent = await Inventory.save();
        res.status(201).json({ success: true, message: "Inventory inserted successfully!", saveInvent });
    } catch (error) {
        console.error("Error inserting inventory:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
};


const View= async(req,res)=>{
    try{
        const data=await inventorySchema.find();
        res.json(data)
    }catch(error){
        console.log(error)
    }


}

const Delete = async (req,res)=>{
    try{
      const id = req.params.id
      let data = await inventorySchema.findById(id);

      if(!data){
        console.log("Data not found with this ID");
        return res.status(404).send("Data does not exists with this Id");
      }
      else{
        data = await inventorySchema.findByIdAndDelete(req.params.id);

        res.json({"Success":true, "Deleted Data":data});
      }


    }catch(error){
    
     console.log(error)
     res.status(500).json("Some internal error!!!")

    }
}

const Home = async (req, res) => {
  try {
    if (req.params.id) {
      console.log("Fetching single item:", req.params.id); // Debugging log
      let inventory = await inventorySchema.findById(req.params.id);
      if (!inventory) {
        return res.status(404).json({
          success: false,
          message: "Data not found with this ID",
        });
      }
      return res.json({
        success: true,
        message: "Data found successfully",
        data: inventory,
      });
    }

    console.log("Fetching all inventory items"); // Debugging log
    let inventories = await inventorySchema.find();
    return res.json({
      success: true,
      message: "All data retrieved successfully",
      data: inventories,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

  const SingleView= async (req,res)=>{
    try{
      let inventory= await inventorySchema.findById(req.params.id)
      if (!inventory){
        res.json({
          success:false,
          message: "Recipy not found with ID!",
         
        })
      }
      else{
        res.json({
        success:true,
        message: "Recipy detail fetched successfully",
        data: inventory,
        
      });
    }
    }
    catch(error){
      console.log(error)
 
     }
}
const Card= async (req, res) => {
  try {
    const item = await ItemModel.findById(req.params.id); // Assuming you're using Mongoose
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

  

module.exports=  {Insert,View,Delete,Home,SingleView,Card}  
