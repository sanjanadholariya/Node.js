const adminModel = require("../models/adminModel");
const moment = require("moment");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const { options } = require("../routes/adminRoutes");

module.exports.dashboard = async (req, res) => {
  try {
    if (req.cookies.adminData && req.cookies.adminData._id) {
      return res.render("dashboard");
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.addForm = async (req, res) => {
  try {
    if (req.cookies.adminData && req.cookies.adminData._id) {
      return res.render("addForm");
    } else {
      return res.redirect('/');
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.addFormData = async (req, res) => {
  try {
    if (req.cookies.adminData && req.cookies.adminData._id) {
      console.log(req.body);

      req.body.password = await bcrypt.hash(req.body.password, 10);
      req.body.start_date = moment().format("MM Do YYYY, h:mm:ss a");
      req.body.update_date = moment().format("MM Do YYYY, h:mm:ss a");
      req.body.profile = req.file.filename;

      await adminModel.create(req.body);

      return res.redirect("/admin/table");
    } else {
      return res.redirect('/');
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.table = async (req, res) => {
  try {
    if (req.cookies.adminData && req.cookies.adminData._id) {
      console.log(req.query.search);

      var search = "";
      if (req.query.search) {
        search = req.query.search;
      }
      let data = await adminModel.find({
        $or: [
          {
            name: { $regex: search, $options: "i" },
          },
          {
            email: { $regex: search, $options: "i" },
          },
          {
            city: { $regex: search, $options: "i" },
          },
        ],
      });
      return res.render("table", {
        data,
      });
    } else {
      return res.redirect('/');
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.viewSingle = async (req, res) => {
  try {
    if (req.cookies.adminData && req.cookies.adminData._id) {
      const single = await adminModel.findById(req.params.id);
      console.log(single);

      return res.status(200).json({
        status: "success",
        data: single,
      });
    } else {
      return res.redirect('/');
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};
module.exports.delete = async (req, res) => {
  try {
    if (req.cookies.adminData && req.cookies.adminData._id) {
      const single = await adminModel.findById(req.params.id);

      if (single.profile) {
        const oldpath = path.join(__dirname, "../uploads/", single.profile);
        fs.unlinkSync(oldpath);
      }
      await adminModel.findByIdAndDelete(req.params.id);
      return res.redirect("/admin/table");
    } else {
      return res.redirect('/');
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin/table");
  }
};

module.exports.edit = async (req, res) => {
  try {
    if (req.cookies.adminData && req.cookies.adminData._id) {
      const single = await adminModel.findById(req.params.id);
      console.log(single);

      return res.render("editAdmin", {
        single,
      });
    } else {
      return res.redirect('/');
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin/tale");
  }
};

module.exports.editAdminData = async (req, res) => {
  try {
    if (req.cookies.adminData && req.cookies.adminData._id) {
      const single = await adminModel.findById(req.params.id);
      if (req.body) {
        if (req.file) {
          if (single.profile) {
            const oldpath = path.join(__dirname, "../uploads/", single.profile);
            fs.unlinkSync(oldpath);
          }
          req.body.profile = req.file.filename;
        }
        await adminModel.findByIdAndUpdate(req.params.id, req.body);
      } else {
        console.log("No Data Found !! Something Went Wrong...!!");
        return res.redirect("/admin/table");
      }
      return res.redirect("/admin/table");
    } else {
      return res.redirect('/');
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin/table");
  }
};
