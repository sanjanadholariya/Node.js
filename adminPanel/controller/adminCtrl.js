const adminModel = require('../model/adminModel')
const moment = require('moment');
const { all } = require('../routes/adminRoutes');
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')

module.exports.admin = async (req, res) => {
  try {
    if (req.cookies.admin && req.cookies.admin._id) {
      return res.render('dashboard')
    }
    else {
      return res.redirect('/')
    }
  } catch (err) {
    console.log(err);
    return res.redirect('/')

  }
}

module.exports.view = async (req, res) => {
  try {

    if (req.cookies.admin && req.cookies.admin._id) {
      var search = "";
      if (req.query.search) {
        search = req.query.search
      }
      let data = await adminModel.find({
        $or: [
          {
            name: { $regex: search, $options: 'i' }
          },
          {
            email: { $regex: search, $options: 'i' }
          },
          {
            city: { $regex: search, $options: 'i' }
          }
        ]
      })
      return res.render('view', {
        data
      })
    }
    else {
      return res.redirect('/')
    }




  }
  catch (err) {
    console.log(err);
    return res.redirect('/admin')
  }
}

module.exports.viewSingle = async (req, res) => {
  try {
    const single = await adminModel.findById(req.params.id)
    console.log(single.name);

    return res.status(200).json({
      status: "success",
      data: single
    })
  } catch (err) {
    console.log(err);
    return res.redirect('/admin')

  }

}

module.exports.addAdmin = async (req, res) => {
  try {
    if (req.cookies.admin && req.cookies.admin._id) {
      return res.render('addAdmin')
    }
    else {
      return res.redirect('/')
    }
  } catch (err) {
    console.log(err);
    return res.redirect('/admin')

  }
}

module.exports.addForm = async (req, res) => {
  try {
    if (req.cookies.admin && req.cookies.admin._id) {
      req.body.name = req.body.fname + " " + req.body.lname
      req.body.profile = req.file.filename
      req.body.status = true
      req.body.start_date = moment().format('MM Do YYYY, h:mm:ss a');
      req.body.update_date = moment().format('MM Do YYYY, h:mm:ss a');
      req.body.password = bcrypt.hashSync(req.body.password, 10);

      // console.log(req.body);

      await adminModel.create(req.body)
      return res.redirect('/admin/view')

    }
    else {
      return res.redirect('/')
    }
  } catch (err) {
    console.log(err);
    return res.redirect('/admin')

  }

}

module.exports.delete = async (req, res) => {
  try {

    if (req.cookies.admin && req.cookies.admin._id) {

    }
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
    else {
      return res.redirect('/')
    }


  } catch (err) {
    console.log(err);
    return res.redirect('/admin/view')

  }
}

module.exports.editAdmin = async (req, res) => {

  try {

    if (req.cookies.admin && req.cookies.admin._id) {

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
    }
    else {
      return res.redirect('/')
    }

  } catch (err) {
    console.log(err);
    return res.redirect('/admin')

  }
}

module.exports.edit = async (req, res) => {
  try {

    if (req.cookies.admin && req.cookies.admin._id) {

      const single = await adminModel.findById(req.params.id)
      console.log(single.profile);
      if (req.body) {
        if (req.file) {
          if (single.profile) {
            let oldpath = path.join(__dirname, '../uploads/', single.profile)
            fs.unlinkSync(oldpath)
          }
          req.body.profile = req.file.filename;
          req.body.name = req.body.fname + " " + req.body.lname;
          req.body.update_date = moment().format('MM Do YYYY, h:mm:ss a');
        }
        await adminModel.findByIdAndUpdate(req.params.id, req.body)

      } else {
        console.log("No Data Found !!");

      }
      return res.redirect('/admin/view')
    }
    else {
      return res.redirect('/')
    }

  } catch (err) {
    console.log(err);
    return res.redirect('/admin')

  }
}