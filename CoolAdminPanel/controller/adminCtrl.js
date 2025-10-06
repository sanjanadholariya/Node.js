const adminModel = require("../model/adminModel");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

module.exports.Dashboard = async (req, res) => {
  try {
    return res.render("dashboard");
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.addAdminPage = async (req, res) => {
  try {
    return res.render("addAdminPage");
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.addAdmin = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    req.body.profile = "/uploads/profile/" + req.file.filename;
    console.log(req.body);
    await adminModel.create(req.body);
    return res.redirect("/admin/viewAdminPage");
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.viewAdminPage = async (req, res) => {
  try {
    const admins = await adminModel.find({});
    return res.render("viewAdminPage", { admins });
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.deleteAdmin = async (req, res) => {
  try {
    // console.log(req.params.id)
    const single = await adminModel.findById(req.params.id);
    // console.log(single)
    if (single.profile) {
      let oldPath = path.join(__dirname, "..", single.profile);
      fs.unlinkSync(oldPath);
    }
    await adminModel.findByIdAndDelete(req.params.id);
    return res.redirect("/admin/viewAdminPage");
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.editAdminPage = async (req, res) => {
  try {
    // console.log("editId : ",req.params.id)

    const single = await adminModel.findById(req.params.id);

    return res.render("editAdminPage", { single });
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.editAdmin = async (req, res) => {
  try {
    console.log(req.params.id);
    const single = await adminModel.findById(req.params.id);
    if (single) {
      if (req.file) {
        if (single.profile) {
          let oldPath = path.join(__dirname, "..", single.profile);
          fs.unlinkSync(oldPath);
        }
        req.body.profile = "/uploads/profile/" + req.file.filename;
      }
       await adminModel.findByIdAndUpdate(req.params.id , req.body)
      return res.redirect("/admin/viewAdminPage");
     
    } else {
      console.log("No Data Found !!");
      return res.redirect("/admin");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};
