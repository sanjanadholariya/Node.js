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
          to: "jitendradholariya871@gmail.com",
          subject: "Registration",
          html: `<p>Hello...!!</p>
        <p>Your Password Is ${req.body.password}.</p>`,
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

