const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { cloudinary } = require('../middleware/storage')


module.exports.addAdmin = async (req, res) => {
  try {

    const email = req.body.email;

    const existUser = await userModel.findOne({ email: email })

    if (existUser) {
      return res.status(409).json({ message: "user already exist !" })
    }

    req.body.profile = req.file.path;
    req.body.public_id = req.file.filename; // using public id we can delete or update the image in cloudinary, for cloudinary req.file.filename is public id 
    req.body.password = await bcrypt.hash(req.body.password, 10)

    await userModel.create(req.body)
    return res.status(200).json({ message: "Admin Added Success" })
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

module.exports.loginAdmin = async (req, res) => {
  try {
    const email = req.body.email;

    const existUser = await userModel.findOne({ email: email })
    if (existUser && existUser.isDelete == false) {
      const checkPass = bcrypt.compare(req.body.password, existUser.password)
      if (checkPass) {
        const token = jwt.sign({ userId: existUser._id }, process.env.JWT_SECRET)
        // console.log(token)
        return res.status(200).json({ message: "Login Success", data: token })
      } else {
        return res.status(400).json({ message: "Invalid credential !" })
      }
    } else {
      return res.status(404).json({ message: "User Not Found ! Register First" })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

module.exports.deleteAdmin = async (req, res) => {
  try {
    if (req.user) {
      return res.status(403).json({ message: "Access Denied ! You Cannot Delete Your Own Account" })
    }
    // console.log("Delete Admin")
    const id = req.params.id;
    console.log(id)

    const user = await userModel.findById(id);
    console.log(user)
    if (!user || user.isDelete == true) {
      return res.status(404).json({ message: "User Not Found" })
    }
    await userModel.findByIdAndUpdate(id, { isDelete: true }, { new: true })
    return res.status(200).json({ message: "Delete User Success" })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

module.exports.editAdmin = async (req, res) => {
  try {
    console.log("editAdmin")

    const user = await userModel.findById(req.params.id)
    console.log(user)

    if (user) {
      if (req.file) {
        if (user.profile) {
          if (user.public_id) {
            await cloudinary.uploader.destroy(user.public_id);
          } 

        } req.body.profile = req.file.path
        req.body.public_id = req.file.filename
      }
      const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password')
      return res.status(200).json({ message: "User Update Success", data: updatedUser })
    } else {
      return res.status(404).json({ message: "User Not Found !" })
    }

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error !" })
  }
}

module.exports.changePassword = async(req , res) => {
  try {
    const user = await userModel.findById(req.params.id)
    
    if(user && user.isDelete == false){
      const checkPass = await bcrypt.compare(req.body.password , user.password)
      if(checkPass){
        const hashPass = await bcrypt.hash(req.body.newPassword , 10)
        console.log(hashPass)
        await userModel.findByIdAndUpdate(req.params.id , {password : hashPass})
        return res.status(200).json({message : "Password Change Success"})
      }else{
        return res.status(401).json({message : "Password Incorrect !"})
      }
    }else{
      return res.status(404).json({message : "User Not Found !"})
    }

  } catch (error) {
    console.log(error)
    return res.status(500).json({message : "Internal Server Error"})
  }
}



