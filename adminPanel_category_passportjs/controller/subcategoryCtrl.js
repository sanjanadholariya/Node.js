const subcategoryModel = require('../model/subcategoryModel')
const categoryModel = require('../model/categoryModel')

module.exports.addSubCategoryPage = async(req , res) => {
    try{
        let category = await categoryModel.find({})
        // console.log(category)
        return res.render('subcategory/addSubcategoryPage',{
            category
        })
    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
}

module.exports.addSubcategory = async(req , res) => {
    try{

    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
}