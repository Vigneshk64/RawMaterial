const { json } = require('express');
const AdminSchema = require('../Module/Admin')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET= "NewDB"

const   Insert = async (req, res)=>{
    try{
        
        const {name, email, password} = req.body;

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
    

        const Admin = new AdminSchema({
            name:name,
            email:email,
            password: secPass,

        })

        const saveadmin = await Admin.save();

        res.send(saveadmin)


    }catch(error){
     
    console.log(error)

    }
}

const UserLogin = async(req,res) => {
    try{
        let success = false
        const {email,password} = req.body;
        let admin=await AdminSchema.findOne({email});
        if(!admin){
            success= false;
            return res.status(400).json({msg:"Invalid Credentials"});

        }
        const PasswordCompare= await bcrypt.compare(password,admin.password);

        if(!PasswordCompare){
            success= false
            return  res.json({success,error:"Try to login with correct credentials"})
        }
        console.log("Admin Data:", admin);
        console.log("Received Password:", password);
        console.log("Stored Hashed Password:", admin.password);

        const data=admin.id
        const authtoken=jwt.sign(data,JWT_SECRET)
        success=true;
        res.json({success,authtoken})
        console.log(authtoken)


    }
    catch(error){
        console.log(error)
    }
}

module.exports = {Insert,UserLogin}