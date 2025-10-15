const adminModel = require("../model/usersModel");
const managerModel = require("../model/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

module.exports.registerAdmin = async (req, res) => {
  try {
    const existAdmin = await adminModel.findOne({ email: req.body.email });

    if (existAdmin) {
      return res.json({ message: "Admin Already Exist" });
    } else {
      if (req.file) {
        req.body.profile = `/uploads/${req.file.filename}`;
      }
      req.body.password = await bcrypt.hash(req.body.password, 10);
      await adminModel.create(req.body);

      return res.json({ message: "Register Admin", status: 200 });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 501 });
  }
};

module.exports.loginAdmin = async (req, res) => {
  try {
    const existAdmin = await adminModel.findOne({ email: req.body.email });
    if (existAdmin) {
      const checkPass = await bcrypt.compare(
        req.body.password,
        existAdmin.password
      );
      if (checkPass) {
        const token = jwt.sign({ userId: existAdmin._id }, "testing");
        console.log(token);
        return res.json({
          message: "Login Admin Success",
          status: 200,
          data: token,
        });
      } else {
        return res.json({ message: "Invalid Credential", status: 501 });
      }
    } else {
      return res.json({
        message: "Admin Does Not Exist ! Register First",
        status: 401,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 501 });
  }
};

module.exports.myProfile = async (req, res) => {
  try {
    return res.json({
      message: "User Profile Page",
      status: 200,
      data: req.user,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 501 });
  }
};

module.exports.editAdmin = async (req, res) => {
  try {
    const id = req.query.id;
    const user = await adminModel.findById(id);
    if (user) {
      if (req.file) {
        if (user.profile) {
          const oldPath = `../${user.profile}`;
          fs.unlinkSync(path.join(__dirname, oldPath));
          console.log("Profile Delete !");
        }
        req.body.profile = `/uploads/${user.role}${req.file.filename}`;
      }
      await adminModel.findByIdAndUpdate(user._id, req.body, { new: true });
      const editedUser = await adminModel
        .findById(user._id)
        .select("-password");
      return res.json({
        message: "Admin Edit Success",
        status: 200,
        data: editedUser,
      });
    } else {
      return res.json({ message: "User Not Found !", status: 404 });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 501 });
  }
};

module.exports.deleteAdmin = async (req, res) => {
  try {
    const id = req.query.id;
    const user = req.user;
    if (user) {
      return res.json({
        message: "User Can't Delete Own Account",
        status: 501,
      });
    }
    const single = await adminModel.findByIdAndUpdate(id);
    if (single) {
      await adminModel.findByIdAndUpdate(
        single._id,
        { isDelete: true },
        { new: true }
      );
      return res.json({ message: "Admin Delete Success", status: 200 });
    }
    return res.json({ message: "No User Found !", status: 501 });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 200 });
  }
};

module.exports.allAdmin = async (req, res) => {
  try {
    const allAdmin = await adminModel
      .find({ isDelete: false })
      .select("-password");
    return res.json({
      message: "All Admin Data Success",
      status: 200,
      data: allAdmin,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 200 });
  }
};

// Manager Routes

module.exports.addManager = async (req, res) => {
  try {
    // console.log(req.body)
    const existManager = await managerModel.findOne({ email: req.body.email });
    if (existManager) {
      return res.json({ message: "Manager Already Exist ", status: 501 });
    }
    if (req.file) {
      req.body.profile = `/uploads/${req.file.filename}`;
    }
    req.body.password = await bcrypt.hash(req.body.password, 12);
    // console.log(req.body)
    await managerModel.create(req.body);
    return res.json({ message: "Manager Add Success", status: 200 });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 501 });
  }
};

module.exports.allManager = async (Req, res) => {
  try {
    const allManager = await managerModel
      .find({ role: "Manager", isDelete: false })
      .select("-password");
    return res.json({
      message: "All Manager Success",
      status: 200,
      data: allManager,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 501 });
  }
};

module.exports.editManager = async (req, res) => {
  try {
    const id = req.query.id;
    console.log(req.body);
    console.log(req.file);
    const single = await managerModel.findById(id).select("-password");
    console.log(single);
    if (!single) {
      return res.json({ message: "No Data Found By This Id", status: 404 });
    }
    if (req.file) {
      if (single.profile) {
        oldPath = `..${single.profile}`;
        fs.unlinkSync(path.join(__dirname, oldPath));
        console.log("Profile Delete");
      }
      req.body.profile = `/uploads/${req.file.filename}`;
    }
    await managerModel.findByIdAndUpdate(id, req.body, { new: true });
    const editedManager = await managerModel.findById(id);
    return res.json({
      message: "Edit Manager Success",
      status: 200,
      data: editedManager,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 501 });
  }
};

module.exports.deleteManager = async (req, res) => {
  try {
    const id = req.query.id;
    const single = await managerModel.findById(id);
    console.log(single);
    if (!single) {
      return res.json({ message: "Data Not Found !", status: 404 });
    }
    if (single.isDelete) {
      return res.json({ message: "Already Deleted This Manager", status: 501 });
    }
    await managerModel.findByIdAndUpdate(id, { isDelete: true }, { new: true });
    return res.json({ message: "Delete Manager Success", status: 200 });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 501 });
  }
};
