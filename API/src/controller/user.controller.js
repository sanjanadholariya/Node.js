const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

module.exports.registerUser = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.file);
    const existUser = await userModel.findOne({ email: req.body.email });

    if (existUser) {
      return res.json({ message: "User already exist !" });
    } else {
      if (req.file) {
        req.body.profile = `/uploads/${req.file.filename}`;
      } else {
        req.body.profile = "";
      }
      req.body.password = await bcrypt.hash(req.body.password, 10);
      await userModel.create(req.body);
      // console.log(req.body)
      return res.json({ message: "register User success", status: 200 });
    }
  } catch (err) {
    console.log(err);
    return res.json({ message: "Internal Server Error", status: 501 });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    // console.log(req.body)
    const existUser = await userModel.findOne({ email: req.body.email });
    if (!existUser) {
      return res.json({ message: "User does not exist ! Register First." });
    } else {
      const passMatch = await bcrypt.compare(
        req.body.password,
        existUser.password
      );
      if (passMatch) {
        let token = jwt.sign({ userId: existUser._id }, "testing");
        return res.json({
          message: "login User success",
          status: 200,
          data: token,
        });
      } else {
        return res.json({ message: "Invalid Credential !" });
      }
    }
  } catch (err) {
    console.log(err);
    return res.json({ message: "Internal Server Error", status: 501 });
  }
};

module.exports.allUser = async (req, res) => {
  try {
    const allUser = await userModel.find().select("-password");
    return res.json({ message: "success", status: 200, data: allUser });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Internal Server Error", status: 501 });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const single = req.user;
    if (single) {
      if (single.profile) {
        const oldPath = `../${single.profile}`;
        fs.unlinkSync(path.join(__dirname, oldPath));
        // console.log("profile delete")
      }
      await userModel.findByIdAndDelete(single._id);
      return res.json({ message: "Delete User Success", status: 200 });
    } else {
      req.json({ message: "data not found", status: 404 });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 501 });
  }
};

module.exports.editUser = async (req, res) => {
  try {
    // console.log(req.user)
    const single = req.user;
    // console.log(req.body)
    if (single) {
      if (req.file) {
        if (single.profile) {
          const oldPath = `../${single.profile}`;
          fs.unlinkSync(path.join(__dirname, oldPath));
        //   console.log("profile delete");
        }
        req.body.profile = `/uploads/${req.file.filename}`;
      }
      await userModel.findByIdAndUpdate(single._id , req.body)
      const editedUser = await userModel.findById(single._id).select('-password')
      return res.json({message : "User Update Success",status : 200 , data : editedUser})
    } else {
      return res.json({ message: "No Data Found", status: 404 });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 501 });
  }
};
