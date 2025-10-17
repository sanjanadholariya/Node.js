const managerModel = require('../model/usersModel')
const employeeModel = require('../model/usersModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


module.exports.loginManager = async(req , res) => {
  try {
    const email = req.body.email;

    const existManager = await managerModel.findOne({email : email});
    console.log(existManager)

    if(!existManager || existManager.isDelete == true){
      return res.status(404).json({message : "Manager Not Found !"})
    }

    const matchPass = await bcrypt.compare(req.body.password , existManager.password)

    if(matchPass){
      token =  jwt.sign({userId : existManager._id},process.env.JWT_SECRET)
      return res.status(200).json({message : "Login Manager Successfully",data : token})
    }else{
      return res.status(400).json({message : "Invalid Credential"})
    }

  } catch (error) {
    console.log(error)
    return res.status(500).json({message : "Internal Server Error"})
  }
}

module.exports.changeManagerPassword = async(req , res) => {
  try {
    const id = req.query.id
    const manager = await managerModel.findById(id)
    if(manager && manager.isDelete == false){
      const checkPass = await bcrypt.compare(req.body.cPassword , manager.password)
      if(checkPass){
        const newPassword = await bcrypt.hash(req.body.password , 10)
        await managerModel.findByIdAndUpdate(id , {password : newPassword})
      }else{
        return res.status(400).json({message : "Password Is Incorrect !"})
      }
      return res.status(200).json({message : "Password Change Successfully "})
    }
    else{
      return res.status(404).json({message : "Manager Not Found !"})
    }
    console.log(manager)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message : "Internal Server Error"})
  }
}


// Employee's action which manager can access

module.exports.addEmployee = async(req , res) => {
  try {
    const existEmployee = await employeeModel.findOne({email : req.body.email})

    if(existEmployee){
      return res.status(409).json({message : "Employee Already Exist"})
    }

    if(req.file){
      req.body.profile = `/uploads/${req.file.filename}`
    }
    const mailMsg = {
          from: "sanjanadholariya926@gmail.com",
          to: "ravi.beetonz@gmail.com",
          subject: "Registration",
          html: `<p>Hello ${req.body.name} 😊</p>
        <p>Your Password Is ${req.body.password} For Login Into Your Account. You Can Change It Later.</p>`,
        }
        await sendEmail(mailMsg);
    req.body.password = await bcrypt.hash(req.body.password , 10)
    // console.log(req.body)

    await managerModel.create(req.body)

    return res.status(200).json({message : "Employee Login Success"})

  }catch (error) {
    console.log(error)
    return res.status(500).json({message : "Internal Server Error"})
  }
}

module.exports.deleteEmployee = async(req , res) => {
  try {
    
    console.log("delete Employee")
  } catch (error) {
    console.log(error)
    return res.status(500).json({message : "Internal Server Error"})
  }
}