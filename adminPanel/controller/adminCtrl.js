const adminModel = require('../model/adminModel')
const moment = require('moment');
const { all } = require('../routes/adminRoutes');
const fs = require('fs')
const path = require('path')

module.exports.admin = async (req, res) => {
  try {
    return res.render('dashboard')
  } catch (err) {
    console.log(err);
    return res.redirect('/admin')

  }
}

module.exports.view = async (req, res) => {
  try {
    const data = await adminModel.find()
    // console.log(data);

    return res.render('view', {
      data
    })
  }
  catch (err) {
    console.log(err);
    return res.redirect('/admin')

  }
}

module.exports.addAdmin = async (req, res) => {
  try {
    return res.render('addAdmin')
  } catch (err) {
    console.log(err);
    return res.redirect('/admin')

  }
}

module.exports.addForm = async (req, res) => {
  try {
    req.body.name = req.body.fname + " " + req.body.lname
    req.body.profile = req.file.filename
    req.body.status = true
    req.body.start_date = moment().format('MM Do YYYY, h:mm:ss a');
    req.body.update_date = moment().format('MM Do YYYY, h:mm:ss a');

    // console.log(req.body);

    await adminModel.create(req.body)
    return res.redirect('/admin/view')
  } catch (err) {
    console.log(err);
    return res.redirect('/admin')

  }

}

module.exports.delete = async (req, res) => {
  try {
    // find the record which want to delete
    const single = await adminModel.findById(req.params.id)

    if (single) {
      // if single record has profile then delete first profile from it's folder first
      if (single.profile) {
        fs.unlinkSync(path.join(__dirname, '../uploads/', single.profile))
      }
      // then delete whole single data from database
      await adminModel.findByIdAndDelete(req.params.id)
      return res.redirect('/admin/view')
    }
  } catch (err) {
    console.log(err);
    return res.redirect('/admin/view')

  }
}

module.exports.editAdmin = async (req, res) => {

  try {
    const single = await adminModel.findById(req.params.id)
    if (single) {
      return res.render('editAdmin', {
        single
      })
    }
    else {
      console.log('No Record Found !!');
      return res.redirect('/view')
    }
  } catch (err) {
    console.log(err);
    return res.redirect('/admin')

  }
}

module.exports.edit = async (req, res) => {
  try {
    const single = await adminModel.findById(req.params.id)
    console.log(single.profile);
    if (req.body) {
      if (req.file) {
        if (single.profile) {
          let oldpath = path.join(__dirname, '../uploads/', single.profile)
          fs.unlinkSync(oldpath)
        }
          req.body.profile = req.file.filename;
      } 
        await adminModel.findByIdAndUpdate(req.params.id, req.body)
      
    } else {
      console.log("No Data Found !!");

    }
    return res.redirect('/admin/view')
  } catch (err) {
    console.log(err);
    return res.redirect('/admin')

  }
}